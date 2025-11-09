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
import { SvgFiles } from '@/components/icons/components/files';

export const WidgetEmpty = (props: WidgetProps) => {
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <CircleOff />
        </WidgetIcon>
        <WidgetTitle>empty</WidgetTitle>
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
      <WidgetContent className="justify-items-center">
        <CircleOff className="text-4xl" />
      </WidgetContent>
      <WidgetHeader variant="padding" className="justify-between">
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
