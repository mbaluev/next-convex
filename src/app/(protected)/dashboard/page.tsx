'use client';

import { Dashboard } from '@/components/organisms/dashboard/chart';
import { TransitionsChart } from '@/components/organisms/dashboard/transitions';

const DashboardPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="h-[300px] w-full grid gap-4 grid-cols-1">
        <Dashboard name="d1" />
      </div>
      <div className="h-[300px] w-full grid gap-4 grid-cols-1">
        <TransitionsChart name="d2" />
      </div>
    </div>
  );
};

export default DashboardPage;
