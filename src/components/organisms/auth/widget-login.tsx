import { FormLogin } from '@/components/organisms/auth/form-login';
import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/widget';
import { WidgetHeaderContent } from '@/components/organisms/auth/widget-header-content';

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
