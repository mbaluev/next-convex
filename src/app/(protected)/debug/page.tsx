'use client';

import { WidgetDebug } from '@/components/organisms/widgets/debug';
import { WidgetSidebars } from '@/components/organisms/widgets/sidebars';

const DebugPage = () => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
      <WidgetDebug />
      <WidgetSidebars />
    </div>
  );
};

export default DebugPage;
