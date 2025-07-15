'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogToolbar,
} from '@/components/ui/dialog';
import { UserRoundCog } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/settings/routes';
import { handleDialogClose } from '@/components/molecules/layout/dialogs';
import { useMemo } from 'react';
import { WidgetContent } from '@/components/molecules/layout/widget';
import { FormSettings } from '@/components/auth/form-settings';

export const ProfileDialog = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const _open = useMemo(() => searchParams.has('d', ROUTES.PROFILE.name), [searchParams]);

  function handleClose() {
    const params = new URLSearchParams(searchParams.toString());
    const _params = handleDialogClose(params, 'd', ROUTES.PROFILE.name);
    const _pathname = _params.size > 0 ? `${pathname}?${_params.toString()}` : pathname;
    router.replace(_pathname);
  }

  return (
    <Dialog open={_open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[768px]" close={false}>
        <DialogHeader separator>
          <DialogToolbar title="profile" icon={<UserRoundCog />} close />
          <DialogDescription>
            <span className="block">
              view and manage your personal information, account settings, and preferences.
            </span>
            <span className="block">keep your details up to date.</span>
          </DialogDescription>
        </DialogHeader>
        <WidgetContent variant="dialog">
          <FormSettings />
        </WidgetContent>
      </DialogContent>
    </Dialog>
  );
};
