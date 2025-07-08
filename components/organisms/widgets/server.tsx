import { WidgetUserInfo } from '@/components/auth/widget-user-info';
import { currentUser } from '@/auth/lib/current-user';
import { HardDrive } from 'lucide-react';

export const WidgetServer = async () => {
  const user = await currentUser();
  return <WidgetUserInfo user={user} icon={<HardDrive />} label="server component" />;
};
