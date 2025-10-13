'use client';

import { WidgetAlerts } from '@/components/organisms/widgets/alerts';
import { WidgetSidebars } from '@/components/organisms/widgets/sidebars';
import { WidgetEmpty } from '@/components/organisms/widgets/empty';

const DebugPage = () => {
  return (
    <div className="w-full @container/debug">
      <div className="w-full grid gap-4 grid-cols-1 @2xl/debug:grid-cols-2 @5xl/debug:grid-cols-3">
        <WidgetAlerts />
        <WidgetSidebars />
        <WidgetEmpty />
      </div>
    </div>
  );
};

export default DebugPage;
