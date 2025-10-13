import { ReactNode } from 'react';
import {
  Banknote,
  Code,
  FolderClosed,
  LayoutDashboard,
  ReceiptText,
  Shield,
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
    path: EMPTY_PATH,
    icon: <UserRoundCog />,
    dialog: true,
  },
  PRIVACY_POLICY: {
    name: 'privacy-policy',
    label: 'privacy policy',
    path: EMPTY_PATH,
    icon: <Shield />,
    dialog: true,
  },
  TERMS_CONDITIONS: {
    name: 'terms-conditions',
    label: 'terms & conditions',
    path: EMPTY_PATH,
    icon: <ReceiptText />,
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
    path: '/debug',
    icon: <Code />,
  },
};

export { IS_PATH, ROUTES };
export type { TRouteDTO };
