'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogToolbar,
} from '@/components/atoms/dialog';
import { UserRoundCog } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/settings/routes';
import { handleDialogClose, isDialogOpen } from '@/components/atoms/dialog-handlers';
import { useMemo } from 'react';
import { WidgetContent } from '@/components/molecules/widget';
import { FormSettings } from '@/components/auth/form-settings';

export const DialogProfile = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const _open = useMemo(() => isDialogOpen(searchParams, ROUTES.PROFILE.name), [searchParams]);

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    const _params = handleDialogClose(params, ROUTES.PROFILE.name);
    const _pathname = _params.size > 0 ? `${pathname}?${_params.toString()}` : pathname;
    router.replace(_pathname);
  }

  return (
    <Dialog open={_open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[768px]" close={false}>
        <DialogHeader separator>
          <DialogToolbar title={ROUTES.PROFILE.label} icon={ROUTES.PROFILE.icon} close />
          <DialogDescription>
            <span className="block">
              view and manage your personal information, account settings, and preferences.
            </span>
            <span className="block">keep your details up to date.</span>
          </DialogDescription>
        </DialogHeader>
        <WidgetContent variant="dialog" className="overflow-y-auto">
          <FormSettings />
        </WidgetContent>
      </DialogContent>
    </Dialog>
  );
};
