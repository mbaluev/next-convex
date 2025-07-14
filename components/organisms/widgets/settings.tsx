import { FormSettings } from '@/components/auth/form-settings';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetIcon,
  WidgetProps,
  WidgetTitle,
} from '@/components/molecules/layout/widget';
import { Cog, Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipText } from '@/components/ui/tooltip';

export const WidgetSettings = (props: WidgetProps) => {
  return (
    <Widget {...props}>
      <WidgetContent variant="padding">
        <FormSettings />
      </WidgetContent>
    </Widget>
  );
};
