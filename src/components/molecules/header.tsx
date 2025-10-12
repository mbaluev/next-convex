'use client';

import { SidebarLeftTrigger } from '@/components/molecules/sidebar-left';
import { SidebarRightTrigger } from '@/components/molecules/sidebar-right';
import { Button } from '@/components/atoms/button';
import { useTheme } from 'next-themes';
import { TooltipText } from '@/components/atoms/tooltip';
import { Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BREAD_CRUMBS } from '@/lib/settings/bread-crumbs';
import { BreadCrumbs } from '@/components/molecules/bread-crumbs';

const HeaderThemeBtn = () => {
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

const HeaderRight = () => {
  return (
    <nav className="flex-grow-0 flex gap-4">
      <HeaderThemeBtn />
      {/*<HeaderUserBtn />*/}
      <SidebarRightTrigger />
    </nav>
  );
};

const HeaderLeft = () => {
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
  // const user = useCurrentUser();
  return (
    <header className="flex flex-col w-full z-[8] sticky top-0">
      <div className="flex gap-4 justify-end items-start p-4 w-full bg-background">
        <HeaderLeft />
        <HeaderRight />
      </div>
      {/*{user && <Separator />}*/}
    </header>
  );
};

export { Header };
