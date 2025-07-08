import { ReactNode } from 'react';
import { MasterCenter } from '@/components/molecules/layout/master';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <MasterCenter>{children}</MasterCenter>;
};

export default HomeLayout;
