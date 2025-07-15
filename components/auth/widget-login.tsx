import { FormLogin } from '@/components/auth/form-login';
import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/layout/widget';
import { WidgetHeaderContent } from '@/components/auth/widget-header-content';

export const WidgetLogin = () => {
  return (
    <Widget className="space-y-6">
      <WidgetHeader>
        <WidgetHeaderContent label="welcome back" />
      </WidgetHeader>
      <WidgetContent>
        <FormLogin />
      </WidgetContent>
    </Widget>
  );
};
