'use client';

import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { SidebarLeftTrigger } from '@/components/molecules/layout/sidebar-left';
import { SidebarRightTrigger } from '@/components/molecules/layout/sidebar-right';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { TooltipText } from '@/components/ui/tooltip';
import { LogOut, Moon, Sun, User, UserPen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ButtonLogout } from '@/components/auth/button-logout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { BREAD_CRUMBS } from '@/lib/settings/bread-crumbs';
import { BreadCrumbs } from '@/components/molecules/layout/bread-crumbs';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/lib/settings/routes';
import Link from 'next/link';

const HeaderRightThemeBtn = () => {
  const { setTheme, theme } = useTheme();
  const handleChangeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <TooltipText title="switch theme" side="left">
      <Button variant="ghost" size="icon" onClick={handleChangeTheme} className="flex-grow-0">
        <Moon className="rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
        <Sun className="rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0 absolute" />
      </Button>
    </TooltipText>
  );
};

const HeaderRightUserBtn = () => {
  const user = useCurrentUser();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="bg-transparent hover:bg-secondary">
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[300px] p-0 space-y-0">
        <div className="flex p-4 pb-0 space-x-4 items-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="text-5xl bg-transparent hover:bg-secondary">
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-4">
            <div className="space-y-2">
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </div>
            {user.role === UserRole.USER && <Badge variant="default">user</Badge>}
            {user.role === UserRole.ADMIN && <Badge variant="success">admin</Badge>}
          </div>
        </div>
        <div className="p-4">
          <Link href={ROUTES.PROFILE.path}>
            <DropdownMenuItem>
              <UserPen className="mr-4" />
              profile
            </DropdownMenuItem>
          </Link>
        </div>
        <Separator />
        <div className="p-4">
          <ButtonLogout>
            <DropdownMenuItem>
              <LogOut className="mr-4" />
              logout
            </DropdownMenuItem>
          </ButtonLogout>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeaderRightBar = () => {
  return (
    <nav className="flex-grow-0 flex gap-4">
      <HeaderRightThemeBtn />
      <HeaderRightUserBtn />
      <SidebarRightTrigger />
    </nav>
  );
};

const HeaderBreadCrumbs = () => {
  const pathname = usePathname();
  const breadCrumbs = BREAD_CRUMBS[pathname];
  return (
    <div className="flex-grow flex flex-wrap gap-4">
      <SidebarLeftTrigger />
      <BreadCrumbs breadCrumbs={breadCrumbs} home />
    </div>
  );
};

const Header = () => {
  // const scrolled = useScrollTop();
  return (
    <header className="flex gap-4 justify-end items-start p-4 w-full z-[8] sticky top-0 bg-background">
      <HeaderBreadCrumbs />
      <HeaderRightBar />
    </header>
  );
};

export { Header };
