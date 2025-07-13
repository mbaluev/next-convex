import { ReactNode } from 'react';
import {
  Banknote,
  Code,
  FolderClosed,
  HardDrive,
  Laptop,
  LayoutDashboard,
  UserRoundCog,
} from 'lucide-react';

const EMPTY_PATH = '#';
const IS_PATH = (path?: string) => path !== EMPTY_PATH;

type TRouteDTO = {
  name: string;
  path: string;
  label?: string;
  icon?: ReactNode;
  dialog?: boolean;
};

const ROUTES: Record<string, TRouteDTO> = {
  HOME: {
    name: 'home',
    label: 'home',
    path: '/',
  },
  PROFILE: {
    name: 'profile',
    label: 'profile',
    path: '/profile',
    icon: <UserRoundCog />,
    dialog: true,
  },
  DASHBOARD: {
    name: 'dashboard',
    label: 'dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard />,
  },
  DEPOSITORY: {
    name: 'depository',
    label: 'depository',
    path: '/depository',
    icon: <Banknote />,
  },
  FILES: {
    name: 'files',
    label: 'files',
    path: '/files',
    icon: <FolderClosed />,
  },
  DEBUG: {
    name: 'debug',
    label: 'debug',
    path: EMPTY_PATH,
    icon: <Code />,
  },
  SAMPLE_CLIENT: {
    name: 'sample-client',
    label: 'client component',
    path: '/client',
    icon: <Laptop />,
  },
  SAMPLE_SERVER: {
    name: 'sample-server',
    label: 'server component',
    path: '/server',
    icon: <HardDrive />,
  },
};

export { IS_PATH, ROUTES };
export type { TRouteDTO };
