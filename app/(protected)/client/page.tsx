'use client';

import { WidgetClient } from '@/components/organisms/widgets/client';
import { WidgetDebug } from '@/components/organisms/widgets/debug';
import { WidgetAdmin } from '@/components/organisms/widgets/admin';

const ClientPage = () => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <WidgetClient />
      <WidgetAdmin />
      <WidgetDebug />
    </div>
  );
};

export default ClientPage;
