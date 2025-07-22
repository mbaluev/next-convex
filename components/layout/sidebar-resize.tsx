'use client';

import {
  ComponentProps,
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useRef,
} from 'react';
import { cn } from '@/lib/utils/cn';
import { useCookies } from 'next-client-cookies';
import React from 'react';

const SIDEBAR_RESIZE_NAME = 'menu-left-width';
const SIDEBAR_WIDTH_MIN = 280;
const SIDEBAR_WIDTH_MAX = 480;

interface SidebarResizeContext {
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  width: number;
  resizing: boolean;
}
const SidebarResizeContext = createContext<SidebarResizeContext | null>(null);
function useSidebarResize() {
  const context = useContext(SidebarResizeContext);
  if (!context) throw new Error('useSidebarResize must be used within a SidebarResize.');
  return context;
}

type SidebarResizeProviderProps = { children?: ReactNode };
const SidebarResizeProvider = (props: SidebarResizeProviderProps) => {
  const { children } = props;
  const cookies = useCookies();

  let _defaultWidth: any = cookies.get(SIDEBAR_RESIZE_NAME);
  _defaultWidth = _defaultWidth ? Number(_defaultWidth) : SIDEBAR_WIDTH_MIN;
  const [width, setWidth] = useState(_defaultWidth);

  const [resizing, setResizing] = useState(false);
  const isResizingRef = useRef(false);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);
    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) {
      setResizing(false);
      return;
    }
    let newWidth = e.clientX;
    if (newWidth < SIDEBAR_WIDTH_MIN) newWidth = SIDEBAR_WIDTH_MIN;
    if (newWidth > SIDEBAR_WIDTH_MAX) newWidth = SIDEBAR_WIDTH_MAX;
    setWidth(newWidth);
    cookies.set(SIDEBAR_RESIZE_NAME, String(newWidth));
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    setResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // context value
  const contextValueMemo = (): SidebarResizeContext => ({
    handleMouseDown,
    width,
    resizing,
  });
  const contextValue = useMemo<SidebarResizeContext>(contextValueMemo, [
    handleMouseDown,
    width,
    resizing,
  ]);

  return (
    <SidebarResizeContext.Provider value={contextValue}>{children}</SidebarResizeContext.Provider>
  );
};
SidebarResizeProvider.displayName = 'SidebarResizeProvider';

type SidebarResizeBaseProps = {};
type SidebarResizeProps = ComponentProps<'div'> & SidebarResizeBaseProps;
const SidebarResize = forwardRef<HTMLDivElement, SidebarResizeProps>((props, ref) => {
  const { className, children, ...rest } = props;
  const { handleMouseDown } = useSidebarResize();
  const classResize = cn(
    'absolute top-0 right-0 bottom-0 w-1 opacity-0',
    'bg-secondary z-1 cursor-col-resize',
    className
  );
  return <div ref={ref} className={classResize} onMouseDown={handleMouseDown} {...rest} />;
});
SidebarResize.displayName = 'SidebarResize';

export { SidebarResizeProvider, SidebarResize, useSidebarResize };
