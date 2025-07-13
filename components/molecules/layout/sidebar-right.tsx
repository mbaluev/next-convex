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
import { Cog } from 'lucide-react';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { useCookies } from 'next-client-cookies';
import { TRouteDTO } from '@/lib/settings/routes';
import { useWindowResize } from '@/lib/hooks/use-window-resize';

const SIDEBAR_STORAGE_NAME = 'sidebar-right';
const SIDEBAR_KEYBOARD_SHORTCUT = 'h';
const SIDEBAR_DEFAULT_OPEN = true;
const SIDEBAR_TRANSITION_DURATION = 200;
const SIDEBAR_EVENT_START = 'sidebar-start';
const SIDEBAR_EVENT_END = 'sidebar-end';

interface SidebarRightContext<T> {
  name?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}
const SidebarRightContext = createContext<SidebarRightContext<TRouteDTO> | null>(null);
function useSidebarRight() {
  const context = useContext(SidebarRightContext);
  if (!context) throw new Error('useSidebarRight must be used within a SidebarRight.');
  return context;
}

type SidebarRightProviderBaseProps = {
  name?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  collapsed?: boolean;
};
type SidebarRightProviderProps = ComponentProps<'div'> & SidebarRightProviderBaseProps;
const SidebarRightProvider = forwardRef<HTMLDivElement, SidebarRightProviderProps>((props, ref) => {
  const { name } = props;
  const cookies = useCookies();
  let _defaultOpen: any = cookies.get(name || SIDEBAR_STORAGE_NAME);
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

  // internal state of the sidebar.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpenCallback = (value: boolean | ((value: boolean) => boolean)) => {
    const res = typeof value === 'function' ? value(open) : value;
    if (setOpenProp) return setOpenProp?.(res);
    cookies.set(name || SIDEBAR_STORAGE_NAME, String(res));
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

  // context value
  const contextValueMemo = (): SidebarRightContext<TRouteDTO> => ({
    name,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  });
  const contextValue = useMemo<SidebarRightContext<TRouteDTO>>(contextValueMemo, [
    name,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  ]);

  return (
    <SidebarRightContext.Provider value={contextValue}>
      <div id={name} className={cn('flex flex-grow h-full', className)} ref={ref} {..._props}>
        {children}
      </div>
    </SidebarRightContext.Provider>
  );
});
SidebarRightProvider.displayName = 'SidebarRightProvider';

type SidebarRightTriggerProps = ComponentProps<typeof Button>;
const SidebarRightTrigger = forwardRef<ElementRef<typeof Button>, SidebarRightTriggerProps>(
  (props, ref) => {
    const { onClick, ..._props } = props;
    const { toggleSidebar } = useSidebarRight();
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
        <Cog />
        {/*{!(isMobile ? openMobile : open) && <ChevronsLeft />}*/}
        {/*{(isMobile ? openMobile : open) && <ChevronsRight />}*/}
      </Button>
    );
  }
);
SidebarRightTrigger.displayName = 'SidebarRightTrigger';

type SidebarRightButtonProps = ComponentProps<typeof Button>;
const SidebarRightButton = forwardRef<ElementRef<typeof Button>, SidebarRightButtonProps>(
  (props, ref) => {
    const { onClick, children, ..._props } = props;
    const { toggleSidebar, isMobile } = useSidebarRight();
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
SidebarRightButton.displayName = 'SidebarRightButton';

type SidebarRightBaseProps = {};
type SidebarRightProps = ComponentProps<'nav'> & SidebarRightBaseProps;
const SidebarRight = forwardRef<HTMLDivElement, SidebarRightProps>((props, ref) => {
  const { className, children, ..._props } = props;
  const { isMobile, open, openMobile, toggleSidebar } = useSidebarRight();
  const { width } = useWindowResize();

  const user = useCurrentUser();
  if (!user) return null;

  const classNavDesktop = cn(
    'w-[260px] h-full flex-grow-0 flex-shrink-0 flex-basis-auto',
    !open && 'mr-[-260px]'
  );
  const classNavMobile = cn(
    'w-[calc(100%-12px)] max-w-[300px] fixed top-0 bottom-0 z-[10]',
    openMobile && width > 312 && 'right-0 left-[calc(100%-300px)]',
    openMobile && width <= 312 && 'right-0 left-auto',
    !openMobile && 'right-[-100%] left-[100%]'
  );
  const classNav = cn(
    `transition-all duration-${SIDEBAR_TRANSITION_DURATION}`,
    isMobile ? classNavMobile : classNavDesktop,
    className
  );

  const classDivMobile = cn('h-full shadow-md', 'rounded-l-lg');
  const classDivDesktop = cn('fixed w-[260px] h-full');
  const classDiv = cn(
    'bg-sidebar text-sidebar-foreground',
    isMobile ? classDivMobile : classDivDesktop
  );

  const classMobile = cn(
    'absolute top-0 left-0 w-full h-full z-[9] bg-black/25',
    'right-0',
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
SidebarRight.displayName = 'SidebarRight';

export {
  SidebarRightProvider,
  SidebarRight,
  SidebarRightTrigger,
  SidebarRightButton,
  useSidebarRight,
  SIDEBAR_EVENT_START,
  SIDEBAR_EVENT_END,
};
