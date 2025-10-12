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
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export const WidgetEmpty = (props: WidgetProps) => {
  const tasks = useQuery(api.tasks.get);
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <CircleOff />
        </WidgetIcon>
        <WidgetTitle>empty</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="padding">
        {tasks?.map(({ _id, text }) => (
          <div key={_id} className="flex flex-row gap-4">
            <div>{_id}</div>
            <div>{text}</div>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  );
};
