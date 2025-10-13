'use client';

import { Chart } from '@/components/organisms/chart';

const DashboardPage = () => {
  return (
    <div className="h-[400px] w-full grid gap-4 grid-cols-1">
      <Chart />
    </div>
  );
};

export default DashboardPage;
