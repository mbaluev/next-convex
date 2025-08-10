import { toast } from 'sonner';
import { admin } from '@/auth/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { UserRole } from '@prisma/client';
import { AlertSuccess } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  ArrowLeftFromLine,
  ArrowRightToLine,
  ChevronsLeft,
  ChevronsRight,
  Code,
  Ellipsis,
} from 'lucide-react';
import { TooltipText } from '@/components/ui/tooltip';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetIcon,
  WidgetProps,
  WidgetTitle,
} from '@/components/layout/widget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebarRight } from '@/components/layout/sidebar-right';
import React from 'react';
import { useSidebarLeft } from '@/components/layout/sidebar-left';

export const WidgetDebug = (props: WidgetProps) => {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('allowed api route', { duration: 10000 });
      } else {
        toast.error('forbidden api route', { duration: 10000 });
      }
    });
  };
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const success = () => toast.success('success');
  const warning = () => toast.warning('warning');
  const error = () => toast.error('error');
  const info = () => toast.info('info');

  const {
    toggleSidebar: toggleLeft,
    open: openLeft,
    isMobile: isMobileLeft,
    openMobile: openMobileLeft,
  } = useSidebarLeft();
  const {
    toggleSidebar: toggleRight,
    open: openRight,
    isMobile: isMobileRight,
    openMobile: openMobileRight,
  } = useSidebarRight();

  return (
    <Widget {...props}>
      <WidgetHeader variant="background">
        <WidgetIcon>
          <Code />
        </WidgetIcon>
        <WidgetTitle>debug</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="background" className="space-y-6">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <AlertSuccess message="you are allowed to see this content" />
        </RoleGate>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between rounded-md p-4 gap-4 border-2">
            <p>admin-only api route</p>
            <Button onClick={onApiRouteClick}>click to test</Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded-md p-4 gap-4 border-2">
            <p>admin-only server action</p>
            <Button onClick={onServerActionClick}>click to test</Button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Button variant="destructive" onClick={error}>
              click to error
            </Button>
          </div>
          <div>
            <Button variant="warning" onClick={warning}>
              click to warning
            </Button>
          </div>
          <div>
            <Button variant="success" onClick={success}>
              click to success
            </Button>
          </div>
          <div>
            <Button variant="default" onClick={info}>
              click to info
            </Button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button variant="outline" onClick={toggleLeft}>
              {!(isMobileLeft ? openMobileLeft : openLeft) && <ChevronsRight />}
              {(isMobileLeft ? openMobileLeft : openLeft) && <ChevronsLeft />}
              sidebar left
            </Button>
            <Button variant="outline" onClick={toggleRight}>
              {!(isMobileRight ? openMobileRight : openRight) && <ArrowLeftFromLine />}
              {(isMobileRight ? openMobileRight : openRight) && <ArrowRightToLine />}
              sidebar right
            </Button>
          </div>
        </div>
      </WidgetContent>
      <WidgetHeader variant="background" className="justify-end">
        <TooltipText title="more actions" side="left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="min-w-[300px]">
              ...
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipText>
      </WidgetHeader>
    </Widget>
  );
};
