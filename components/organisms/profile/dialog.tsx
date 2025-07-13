'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogToolbar,
} from '@/components/ui/dialog';
import { ProfileContent } from '@/components/organisms/profile/content';
import { UserRoundCog } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/settings/routes';
import { handleDialogClose } from '@/components/molecules/layout/dialogs';
import { useMemo } from 'react';

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
      <DialogContent className="max-w-[1280px]" close={false}>
        <DialogHeader>
          <DialogToolbar title="profile" icon={<UserRoundCog />} close />
          <DialogDescription
            dangerouslySetInnerHTML={{
              __html:
                'view and manage your personal information, account settings, and preferences. ' +
                'keep your details up to date to ensure a seamless experience across the platform.',
            }}
          />
        </DialogHeader>
        <ProfileContent />
      </DialogContent>
    </Dialog>
  );
};
