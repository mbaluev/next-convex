import { Button } from '@/components/atoms/button';
import { useSidebarRight } from '@/components/molecules/sidebar-right';
import { useSidebarLeft } from '@/components/molecules/sidebar-left';
import {
  ArrowLeftFromLine,
  ArrowLeftToLine,
  ArrowRightFromLine,
  ArrowRightToLine,
  Menu,
} from 'lucide-react';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetIcon,
  WidgetProps,
  WidgetTitle,
} from '@/components/molecules/widget';

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
          <Menu />
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
    </Widget>
  );
};
