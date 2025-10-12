'use client';

import { AlertError } from '@/components/atoms/alert';
import { Widget, WidgetContent, WidgetHeader } from '@/components/molecules/widget';
import { WidgetHeaderContent } from '@/components/auth/widget-header-content';
import { ButtonBack } from '@/components/auth/button-back';

export const WidgetError = () => {
  return (
    <Widget className="space-y-6">
      <WidgetHeader>
        <WidgetHeaderContent label="error" />
      </WidgetHeader>
      <WidgetContent className="space-y-6">
        <AlertError message="oops! something went wrong" />
        <ButtonBack href="/auth/login" label="back to login" />
      </WidgetContent>
    </Widget>
  );
};
