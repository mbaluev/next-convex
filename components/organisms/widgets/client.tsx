import { useCurrentUser } from '@/auth/hooks/use-current-user';
import { WidgetUserInfo } from '@/components/auth/widget-user-info';
import { Laptop } from 'lucide-react';
import { WidgetProps } from '@/components/molecules/layout/widget';

export const WidgetClient = (props: WidgetProps) => {
  const user = useCurrentUser();
  return <WidgetUserInfo user={user} icon={<Laptop />} label="client component" {...props} />;
};
