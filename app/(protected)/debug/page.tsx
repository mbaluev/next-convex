'use client';

import { WidgetDebug } from '@/components/organisms/widgets/debug';

const DebugPage = () => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
      <WidgetDebug />
    </div>
  );
};

export default DebugPage;
