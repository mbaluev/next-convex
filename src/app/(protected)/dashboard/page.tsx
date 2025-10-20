'use client';

import { ChartTransitions } from '@/components/organisms/chart-transitions';

const DashboardPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="h-[300px] w-full grid gap-4 grid-cols-1">
        <ChartTransitions name="d1" />
      </div>
      <div className="h-[300px] w-full grid gap-4 grid-cols-1">
        <ChartTransitions name="d2" />
      </div>
    </div>
  );
};

export default DashboardPage;
