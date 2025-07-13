'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { SvgLogo } from '@/components/svg/components/logo';
import { ChevronRight, Cog, LogOut, UserPen, X } from 'lucide-react';
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
import { ButtonLogout } from '@/components/auth/button-logout';

const MENU_PADDING_ITEM = 15;
const MENU_TRANSITION_DURATION = 100;

interface IMenuItemProps<T> {
  node: TTreeDTO<T>;
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
    `transition-all transform duration-${MENU_TRANSITION_DURATION}`,
    !node.state.collapsed && 'rotate-90'
  );
  return (
    <Fragment>
      {node.data?.icon}
      <p className="flex-1 text-left">{node.data?.label}</p>
      {node.items.length > 0 && <ChevronRight className={classNameChevron} />}
    </Fragment>
  );
};
MenuItemContent.displayName = 'MenuItemContent';

// menu-left
const MenuItemLeft = (props: IMenuItemProps<TRouteDTO>) => {
  const { node } = props;
  const { toggleNode } = useSidebarLeft();

  if (!node.data) return null;

  // item toggle
  if (!IS_PATH(node.data.path)) {
    const handleToggle = () => toggleNode(node);
    return (
      <div className="flex">
        <MenuItemPadding node={node} />
        <Button
          size="flex-start"
          variant={node.state.selected ? 'sidebar' : 'ghost'}
          onClick={handleToggle}
          className="flex-1"
        >
          <MenuItemContent node={node} />
        </Button>
      </div>
    );
  }

  // item link
  return (
    <div className="flex">
      <MenuItemPadding node={node} />
      <SidebarLeftButton
        variant={node.state.selected ? 'sidebar' : 'ghost'}
        className="flex-1"
        asChild
      >
        <Link href={node.data.path}>
          <MenuItemContent node={node} />
        </Link>
      </SidebarLeftButton>
    </div>
  );
};
MenuItemLeft.displayName = 'MenuItemLeft';

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

// menu-right
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
  const { toggleSidebar } = useSidebarRight();
  if (!user) return null;
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 justify-between items-center p-4">
        <SidebarRightButton variant="ghost" className="flex-1">
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
        <SidebarRightButton variant="ghost" size="flex-start" className="w-full" asChild>
          <Link href={ROUTES.PROFILE.path}>
            <UserPen />
            profile
          </Link>
        </SidebarRightButton>
        <ButtonLogout variant="ghost" size="flex-start" className="w-full">
          <LogOut />
          logout
        </ButtonLogout>
      </div>
    </div>
  );
};
MenuRightContent.displayName = 'MenuRightContent';

export { MenuLeft, MenuRight };
