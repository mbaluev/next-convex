import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/widget';
import { WidgetHeaderContent } from '@/components/auth/widget-header-content';
import { FormReset } from '@/components/auth/form-reset';

export const WidgetReset = () => {
  return (
    <Widget className="space-y-6">
      <WidgetHeader>
        <WidgetHeaderContent label="forgot your password?" />
      </WidgetHeader>
      <WidgetContent>
        <FormReset />
      </WidgetContent>
    </Widget>
  );
};
