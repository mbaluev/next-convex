'use client';

import { CircleOff, Ellipsis } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { TooltipText } from '@/components/atoms/tooltip';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
  WidgetIcon,
  WidgetProps,
} from '@/components/molecules/widget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';

export const WidgetEmpty = (props: WidgetProps) => {
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <CircleOff />
        </WidgetIcon>
        <WidgetTitle>empty</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="padding">...</WidgetContent>
      <WidgetHeader variant="background" className="justify-end">
        <TooltipText title="more actions" side="left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="min-w-[200px]">
              ...
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipText>
      </WidgetHeader>
    </Widget>
  );
};
