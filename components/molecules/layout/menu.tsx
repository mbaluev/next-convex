'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { SvgLogo } from '@/components/svg/components/logo';
import { ChevronRight, Cog, X, BookOpen } from 'lucide-react';
import { TTreeDTO } from '@/lib/utils/tree';
import { Fragment, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { TRouteDTO, IS_PATH, ROUTES } from '@/lib/settings/routes';
import {
  SidebarLeft,
  SidebarLeftButton,
  SidebarLeftProvider,
  useSidebarLeft,
} from '@/components/molecules/layout/sidebar-left';
import {
  SidebarRight,
  SidebarRightButton,
  SidebarRightProvider,
  useSidebarRight,
} from '@/components/molecules/layout/sidebar-right';
import { HeaderUserContent } from '@/components/molecules/layout/header';
import { Separator } from '@/components/ui/separator';

const MENU_PADDING_ITEM = 15;
const MENU_TRANSITION_DURATION = 100;

interface IMenuItemProps<T> {
  node: TTreeDTO<T>;
  toggleNode?: (node: TTreeDTO<TRouteDTO>) => void;
}

const MenuItemPadding = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  if (!node.state.level || node.state.level <= 1) return null;
  return <div style={{ width: `${(node.state.level - 1) * MENU_PADDING_ITEM}px` }} />;
};
MenuItemPadding.displayName = 'MenuItemPadding';

const MenuItemContent = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  const classNameChevron = cn(
    `transition-transform transform duration-${MENU_TRANSITION_DURATION}`,
    !node.state.collapsed && 'rotate-90'
  );
  return (
    <Fragment>
      {node.data?.icon}
      <p className="flex-1 text-left">{node.data?.label}</p>
      {Boolean(node.data?.dialog) && <BookOpen />}
      {node.items.length > 0 && <ChevronRight className={classNameChevron} />}
    </Fragment>
  );
};
MenuItemContent.displayName = 'MenuItemContent';

const MenuItemToggle = (props: IMenuItemProps<TRouteDTO>) => {
  const { node, toggleNode } = props;
  const handleToggle = () => {
    if (toggleNode) toggleNode(node);
  };
  return (
    <Button
      size="flex-start"
      variant={node.state.selected ? 'sidebar' : 'ghost'}
      onClick={handleToggle}
      className="w-full"
    >
      <MenuItemPadding {...props} />
      <MenuItemContent {...props} />
    </Button>
  );
};
MenuItemToggle.displayName = 'MenuItemToggle';

// ---

const MenuItemLeft = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  const { toggleNode } = useSidebarLeft();
  const _props = { node, toggleNode };
  if (!node.data) return null;

  // item toggle
  if (!IS_PATH(node.data.path)) return <MenuItemToggle {..._props} />;

  // item link
  return (
    <SidebarLeftButton
      variant={node.state.selected ? 'sidebar' : 'ghost'}
      className="w-full"
      asChild
    >
      <Link href={node.data.path}>
        <MenuItemPadding {..._props} />
        <MenuItemContent {..._props} />
      </Link>
    </SidebarLeftButton>
  );
};
MenuItemLeft.displayName = 'MenuItemLeft';

const MenuItemRight = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  const { toggleNode } = useSidebarRight();
  const _props = { node, toggleNode };
  if (!node.data) return null;

  // item toggle
  if (!IS_PATH(node.data.path)) return <MenuItemToggle {..._props} />;

  // item link
  return (
    <SidebarRightButton
      variant={node.state.selected ? 'sidebar' : 'ghost'}
      className="w-full"
      asChild
    >
      <Link href={node.data.path}>
        <MenuItemPadding {..._props} />
        <MenuItemContent {..._props} />
      </Link>
    </SidebarRightButton>
  );
};
MenuItemRight.displayName = 'MenuItemRight';

// --- menu-left

interface IMenuProps {
  children: ReactNode;
}
const MenuLeft = (props: IMenuProps) => {
  const { children } = props;
  const user = useCurrentUser();
  return (
    <SidebarLeftProvider name="menu-left" collapsed>
      {user && (
        <SidebarLeft className="z-20">
          <MenuLeftContent />
        </SidebarLeft>
      )}
      {children}
    </SidebarLeftProvider>
  );
};
MenuLeft.displayName = 'MenuLeft';

const MenuLeftContent = () => {
  const user = useCurrentUser();
  const { toggleSidebar, data } = useSidebarLeft();
  if (!user) return null;
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 p-4 justify-between">
        <SidebarLeftButton asChild variant="ghost" className="flex-1">
          <Link href={ROUTES.HOME.path}>
            <SvgLogo className="w-6 h-6" />
            <p>{process.env.APP_NAME}</p>
          </Link>
        </SidebarLeftButton>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <X />
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-4 p-4">
        {data
          ?.flat()
          ?.filter((d) => !d.state.hidden)
          .map((node, index) => <MenuItemLeft key={index} node={node} />)}
      </div>
    </div>
  );
};
MenuLeftContent.displayName = 'MenuLeftContent';

// --- menu-right

const MenuRight = (props: IMenuProps) => {
  const { children } = props;
  const user = useCurrentUser();
  return (
    <SidebarRightProvider name="menu-right" collapsed>
      {children}
      {user && (
        <SidebarRight className="z-10">
          <MenuRightContent />
        </SidebarRight>
      )}
    </SidebarRightProvider>
  );
};
MenuRight.displayName = 'MenuRight';

const MenuRightContent = () => {
  const user = useCurrentUser();
  const { toggleSidebar, data } = useSidebarRight();
  if (!user) return null;
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 justify-between items-center p-4">
        <SidebarRightButton variant="static" className="flex-1">
          <Cog />
          <p>settings</p>
        </SidebarRightButton>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <X />
        </Button>
      </div>
      <Separator />
      <HeaderUserContent />
      <Separator />
      <div className="flex flex-col gap-4 p-4">
        {data
          ?.flat()
          ?.filter((d) => !d.state.hidden)
          .map((node, index) => <MenuItemRight key={index} node={node} />)}
      </div>
    </div>
  );
};
MenuRightContent.displayName = 'MenuRightContent';

export { MenuLeft, MenuRight };
