import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/widget';
import { WidgetHeaderContent } from '@/components/organisms/auth/widget-header-content';
import { FormRegister } from '@/components/organisms/auth/form-register';

export const WidgetRegister = () => {
  return (
    <Widget className="space-y-6">
      <WidgetHeader>
        <WidgetHeaderContent label="create an account" />
      </WidgetHeader>
      <WidgetContent>
        <FormRegister />
      </WidgetContent>
    </Widget>
  );
};
