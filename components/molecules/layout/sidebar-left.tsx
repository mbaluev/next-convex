'use client';

import {
  ComponentProps,
  createContext,
  ElementRef,
  forwardRef,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '@/lib/utils/cn';
import { MEDIA_MD, useMatchMedia } from '@/lib/hooks/use-match-media';
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { useCookies } from 'next-client-cookies';
import { CTree, TTreeDTO } from '@/lib/utils/tree';
import { menuLeft } from '@/lib/settings/menu';
import { usePathname } from 'next/navigation';
import { TRouteDTO } from '@/lib/settings/routes';

const SIDEBAR_STORAGE_NAME = 'sidebar-left';
const SIDEBAR_KEYBOARD_SHORTCUT = 'h';
const SIDEBAR_DEFAULT_OPEN = true;
const SIDEBAR_TRANSITION_DURATION = 200;
const SIDEBAR_EVENT_START = 'sidebar-start';
const SIDEBAR_EVENT_END = 'sidebar-end';

interface SidebarLeftContext<T> {
  name?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  toggleNode: (node: TTreeDTO<T>) => void;
  data?: CTree<T>;
}
const SidebarLeftContext = createContext<SidebarLeftContext<TRouteDTO> | null>(null);
function useSidebarLeft() {
  const context = useContext(SidebarLeftContext);
  if (!context) throw new Error('useSidebarLeft must be used within a SidebarLeft.');
  return context;
}

type SidebarLeftProviderBaseProps = {
  name?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  collapsed?: boolean;
};
type SidebarLeftProviderProps = ComponentProps<'div'> & SidebarLeftProviderBaseProps;
const SidebarLeftProvider = forwardRef<HTMLDivElement, SidebarLeftProviderProps>((props, ref) => {
  const { name = SIDEBAR_STORAGE_NAME } = props;
  const cookies = useCookies();
  let _defaultOpen: any = cookies.get(name);
  _defaultOpen = _defaultOpen ? _defaultOpen === 'true' : SIDEBAR_DEFAULT_OPEN;

  const {
    name: _name,
    open: openProp,
    onOpenChange: setOpenProp,
    defaultOpen = _defaultOpen,
    collapsed,
    className,
    children,
    ..._props
  } = props;
  const isMobile = useMatchMedia(MEDIA_MD);
  const [openMobile, setOpenMobile] = useState(false);
  const pathname = usePathname();

  // internal state of the sidebar.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpenCallback = (value: boolean | ((value: boolean) => boolean)) => {
    const res = typeof value === 'function' ? value(open) : value;
    if (setOpenProp) return setOpenProp?.(res);
    cookies.set(name, String(res));
    _setOpen(value);
  };
  const setOpen = useCallback(setOpenCallback, [setOpenProp, open, cookies]);

  // toggle the sidebar.
  const toggleCallback = () => {
    window.dispatchEvent(new Event(SIDEBAR_EVENT_START));
    setTimeout(() => {
      window.dispatchEvent(new Event(SIDEBAR_EVENT_END));
    }, SIDEBAR_TRANSITION_DURATION * 2);
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  };
  const toggleSidebar = useCallback(toggleCallback, [isMobile, setOpen, setOpenMobile]);

  // keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // init data
  const [data, setData] = useState<CTree<TRouteDTO>>(menuLeft);
  const toggleNodeCallback = (node: TTreeDTO<TRouteDTO>) => {
    const _data = data.clone();
    _data.toggle(node.id);
    setData(_data);
  };
  const toggleNode = useCallback(toggleNodeCallback, []);
  useEffect(() => {
    const _data = data.clone();
    if (collapsed) _data.collapseTo(1);
    setData(_data);
  }, [collapsed]);
  useEffect(() => {
    const _data = data.clone();
    const node = _data.find((d) => d.data?.path === pathname);
    if (node) _data.select(node.id, true);
    else _data.deselect();
    setData(_data);
  }, [pathname]);

  // context value
  const contextValueMemo = (): SidebarLeftContext<TRouteDTO> => ({
    name,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    toggleNode,
    data,
  });
  const contextValue = useMemo<SidebarLeftContext<TRouteDTO>>(contextValueMemo, [
    name,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    toggleNode,
    data,
  ]);

  return (
    <SidebarLeftContext.Provider value={contextValue}>
      <div id={name} className={cn('flex flex-grow h-full', className)} ref={ref} {..._props}>
        {children}
      </div>
    </SidebarLeftContext.Provider>
  );
});
SidebarLeftProvider.displayName = 'SidebarLeftProvider';

type SidebarLeftTriggerProps = ComponentProps<typeof Button>;
const SidebarLeftTrigger = forwardRef<ElementRef<typeof Button>, SidebarLeftTriggerProps>(
  (props, ref) => {
    const { onClick, ..._props } = props;
    const { toggleSidebar, isMobile, openMobile, open } = useSidebarLeft();
    const user = useCurrentUser();
    if (!user) return null;
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {..._props}
      >
        {!(isMobile ? openMobile : open) && <ChevronsRight />}
        {(isMobile ? openMobile : open) && <ChevronsLeft />}
      </Button>
    );
  }
);
SidebarLeftTrigger.displayName = 'SidebarLeftTrigger';

type SidebarLeftButtonProps = ComponentProps<typeof Button>;
const SidebarLeftButton = forwardRef<ElementRef<typeof Button>, SidebarLeftButtonProps>(
  (props, ref) => {
    const { onClick, children, ..._props } = props;
    const { toggleSidebar, isMobile } = useSidebarLeft();
    const handleClick = (e: any) => {
      if (onClick) onClick(e);
      if (isMobile) toggleSidebar();
    };
    return (
      <Button ref={ref} size="flex-start" onClick={handleClick} {..._props}>
        {children}
      </Button>
    );
  }
);
SidebarLeftButton.displayName = 'SidebarLeftButton';

type SidebarLeftBaseProps = {};
type SidebarLeftProps = ComponentProps<'nav'> & SidebarLeftBaseProps;
const SidebarLeft = forwardRef<HTMLDivElement, SidebarLeftProps>((props, ref) => {
  const { className, children, ..._props } = props;
  const { isMobile, open, openMobile, toggleSidebar } = useSidebarLeft();

  const user = useCurrentUser();
  if (!user) return null;

  const classNavDesktop = cn(
    'w-[280px] h-full flex-grow-0 flex-shrink-0 flex-basis-auto',
    !open && 'ml-[-280px]'
  );
  const classNavMobile = cn(
    'w-[calc(100%-12px)] max-w-[300px] fixed top-0 bottom-0 z-[10]',
    openMobile && 'left-0 right-4',
    !openMobile && 'left-[-100%] right-[100%]'
  );
  const classNav = cn(
    `transition-all duration-${SIDEBAR_TRANSITION_DURATION}`,
    isMobile ? classNavMobile : classNavDesktop,
    className
  );

  const classDivMobile = cn('h-full shadow-md', 'rounded-r-lg');
  const classDivDesktop = cn('fixed w-[280px] h-full');
  const classDiv = cn(
    'bg-sidebar text-sidebar-foreground',
    isMobile ? classDivMobile : classDivDesktop
  );

  const classMobile = cn(
    'absolute top-0 left-0 w-full h-full z-[9] bg-black/25',
    'left-0',
    classDivMobile
  );

  return (
    <Fragment>
      <nav className={classNav} ref={ref} {..._props}>
        <div className={classDiv}>{children}</div>
      </nav>
      {isMobile && openMobile && <div className={classMobile} onClick={toggleSidebar} />}
    </Fragment>
  );
});
SidebarLeft.displayName = 'SidebarLeft';

export {
  SidebarLeftProvider,
  SidebarLeft,
  SidebarLeftTrigger,
  SidebarLeftButton,
  useSidebarLeft,
  SIDEBAR_EVENT_START,
  SIDEBAR_EVENT_END,
};
