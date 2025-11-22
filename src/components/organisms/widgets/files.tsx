'use client';

import { FolderClosed } from 'lucide-react';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
  WidgetIcon,
  WidgetProps,
} from '@/components/molecules/widget';
import { useQuery } from 'convex/react';
import { api } from '../../../../_convex/_generated/api';

export const WidgetFiles = (props: WidgetProps) => {
  const tasks = useQuery(api.tasks.get);
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <FolderClosed />
        </WidgetIcon>
        <WidgetTitle>files</WidgetTitle>
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
