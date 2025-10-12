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
  const tasks = useQuery(api.dashboard.get);
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <CircleOff />
        </WidgetIcon>
        <WidgetTitle>empty</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="padding">
        {tasks?.map(({ _id, a, b, c }) => (
          <div key={_id} className="flex flex-row gap-2">
            <div style={{ minWidth: 250 }}>{_id}</div>
            <div style={{ minWidth: 60 }}>{a}</div>
            <div style={{ minWidth: 60 }}>{b}</div>
            <div style={{ minWidth: 60 }}>{c}</div>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  );
};
