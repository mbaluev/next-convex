'use client';

import { Widget, WidgetContent, WidgetProps } from '@/components/molecules/widget';
import { ErrorBlock } from '@/components/molecules/error-block';
import { SvgTrash } from '@/components/icons/components/trash';
import { SvgFiles } from '@/components/icons/components/files';
import { SvgSpam } from '@/components/icons/components/spam';
import { SvgSync } from '@/components/icons/components/sync';

export const WidgetIllustrations = (props: WidgetProps) => {
  return (
    <Widget {...props}>
      <WidgetContent className="@container/illustrations">
        <div className="w-full grid gap-10 px-10 grid-cols-1 @xl/illustrations:grid-cols-2 @4xl/illustrations:grid-cols-3 @7xl/illustrations:grid-cols-4">
          <ErrorBlock
            icon={<SvgTrash />}
            code="trash"
            name="messages that have been in trash more than 30 days will be automatically deleted"
          />
          <ErrorBlock
            icon={<SvgFiles />}
            code="files"
            name="designed to store, organize, manage, and track your files efficiently"
          />
          <ErrorBlock icon={<SvgSpam />} code="spam" name="..." />
          <ErrorBlock icon={<SvgSync />} code="sync" name="..." />
        </div>
      </WidgetContent>
    </Widget>
  );
};
