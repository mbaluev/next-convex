import { toast } from 'sonner';
import { Button } from '@/components/atoms/button';
import { Bell } from 'lucide-react';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetIcon,
  WidgetProps,
  WidgetTitle,
} from '@/components/molecules/widget';

export const WidgetAlerts = (props: WidgetProps) => {
  const success = () => toast.success('success');
  const warning = () => toast.warning('warning');
  const error = () => toast.error('error');
  const info = () => toast.info('info');
  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <Bell />
        </WidgetIcon>
        <WidgetTitle>alerts</WidgetTitle>
      </WidgetHeader>
      <WidgetContent variant="padding" className="space-y-4 pb-8">
        <div>
          <Button variant="destructive" onClick={error}>
            click to error
          </Button>
        </div>
        <div>
          <Button variant="warning" onClick={warning}>
            click to warning
          </Button>
        </div>
        <div>
          <Button variant="success" onClick={success}>
            click to success
          </Button>
        </div>
        <div>
          <Button variant="info" onClick={info}>
            click to info
          </Button>
        </div>
      </WidgetContent>
    </Widget>
  );
};
