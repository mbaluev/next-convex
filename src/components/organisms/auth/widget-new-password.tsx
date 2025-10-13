import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/widget';
import { WidgetHeaderContent } from '@/components/organisms/auth/widget-header-content';
import { FormNewPassword } from '@/components/organisms/auth/form-new-password';

export const WidgetNewPassword = () => {
  return (
    <Widget className="space-y-6">
      <WidgetHeader>
        <WidgetHeaderContent label="enter a new password" />
      </WidgetHeader>
      <WidgetContent>
        <FormNewPassword />
      </WidgetContent>
    </Widget>
  );
};
