import { ReactNode } from 'react';
import { MasterFullHeight } from '@/components/molecules/master';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return <MasterFullHeight>{children}</MasterFullHeight>;
};

export default ProtectedLayout;
