import { Code, Ellipsis } from 'lucide-react';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetIcon,
  WidgetProps,
  WidgetTitle,
} from '@/components/molecules/layout/widget';
import { TooltipText } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export const WidgetDebug = (props: WidgetProps) => {
  return (
    <Widget {...props}>
      <WidgetHeader variant="background">
        <WidgetIcon>
          <Code />
        </WidgetIcon>
        <WidgetTitle>debug</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="background" className="space-y-6">
        <div className="flex flex-row gap-4 justify-between">
          <p className="font-medium">APP_NAME</p>
          <p>{process.env.APP_NAME}</p>
        </div>
        <div className="flex flex-row gap-4 justify-between">
          <p className="font-medium">APP_URL</p>
          <p>{process.env.APP_URL}</p>
        </div>
        {/*<div className="flex flex-row gap-4 justify-between">*/}
        {/*  <p className="font-medium">DATABASE_URL</p>*/}
        {/*  <p className="break-all">{process.env.DATABASE_URL}</p>*/}
        {/*</div>*/}
      </WidgetContent>
      <WidgetHeader variant="background" className="justify-end">
        <TooltipText title="more actions" side="left">
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </TooltipText>
      </WidgetHeader>
    </Widget>
  );
};
