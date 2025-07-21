'use client';

import { CircleOff } from 'lucide-react';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
  WidgetIcon,
  WidgetProps,
} from '@/components/layout/widget';

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
    </Widget>
  );
};
