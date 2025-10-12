import { Button } from '@/components/atoms/button';
import {
  ArrowLeftFromLine,
  ArrowLeftToLine,
  ArrowRightFromLine,
  ArrowRightToLine,
  Code,
  Ellipsis,
} from 'lucide-react';
import { TooltipText } from '@/components/atoms/tooltip';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetIcon,
  WidgetProps,
  WidgetTitle,
} from '@/components/molecules/widget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { useSidebarRight } from '@/components/molecules/sidebar-right';
import { useSidebarLeft } from '@/components/molecules/sidebar-left';

export const WidgetSidebars = (props: WidgetProps) => {
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
        <WidgetTitle>sidebars</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="background" className="flex">
        <div className="flex flex-col space-y-6 items-start">
          <Button variant="outline" onClick={toggleLeft}>
            {!(isMobileLeft ? openMobileLeft : openLeft) && <ArrowRightFromLine />}
            {(isMobileLeft ? openMobileLeft : openLeft) && <ArrowLeftToLine />}
            sidebar left
          </Button>
          <Button variant="outline" onClick={toggleRight}>
            {!(isMobileRight ? openMobileRight : openRight) && <ArrowLeftFromLine />}
            {(isMobileRight ? openMobileRight : openRight) && <ArrowRightToLine />}
            sidebar right
          </Button>
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
