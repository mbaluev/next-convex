'use client';

import { WidgetAdmin } from '@/components/organisms/widgets/admin';
import { WidgetSettings } from '@/components/organisms/widgets/settings';
import { WidgetProfile } from '@/components/organisms/widgets/profile';

const ClientPage = () => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <WidgetProfile />
      <WidgetSettings />
      <WidgetAdmin />
    </div>
  );
};

export default ClientPage;
