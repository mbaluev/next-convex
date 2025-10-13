import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/widget';
import { WidgetHeaderContent } from '@/components/organisms/auth/widget-header-content';
import { FormNewVerification } from '@/components/organisms/auth/form-new-verification';

export const WidgetNewVerification = () => {
  return (
    <Widget className="space-y-6">
      <WidgetHeader>
        <WidgetHeaderContent label="confirming you verification" />
      </WidgetHeader>
      <WidgetContent>
        <FormNewVerification />
      </WidgetContent>
    </Widget>
  );
};
