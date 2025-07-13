import {
  AppWindowMac,
  Code,
  LayoutDashboard,
  Laptop,
  OctagonX,
  HardDrive,
  FolderClosed,
  Banknote,
  UserRoundCog,
} from 'lucide-react';
import { CTree } from '@/lib/utils/tree';
import { TRouteDTO, ROUTES } from '@/lib/settings/routes';

const MENU: Record<string, TRouteDTO> = {
  PROFILE: { ...ROUTES.PROFILE, icon: <UserRoundCog /> },
  DASHBOARD: { ...ROUTES.DASHBOARD, icon: <LayoutDashboard /> },
  DEPOSITORY: { ...ROUTES.DEPOSITORY, icon: <Banknote /> },
  FILES: { ...ROUTES.FILES, icon: <FolderClosed /> },
  DEBUG: { ...ROUTES.DEBUG, icon: <Code /> },
  SAMPLE_CLIENT: { ...ROUTES.SAMPLE_CLIENT, icon: <Laptop /> },
  SAMPLE_SERVER: { ...ROUTES.SAMPLE_SERVER, icon: <HardDrive /> },
  ERRORS: { ...ROUTES.ERRORS, icon: <AppWindowMac /> },
  NOT_FOUND: { ...ROUTES.NOT_FOUND, icon: <OctagonX /> },
};
const menuLeft = new CTree<TRouteDTO>();
menuLeft.insert(ROUTES.DASHBOARD.name, menuLeft.root.id, MENU.DASHBOARD);
menuLeft.insert(ROUTES.FILES.name, menuLeft.root.id, MENU.FILES);
menuLeft.insert(ROUTES.DEPOSITORY.name, menuLeft.root.id, MENU.DEPOSITORY);

const menuRight = new CTree<TRouteDTO>();
menuRight.insert(ROUTES.PROFILE.name, menuRight.root.id, MENU.PROFILE);
menuRight.insert(ROUTES.DEBUG.name, menuRight.root.id, MENU.DEBUG);
menuRight.insert(ROUTES.SAMPLE_CLIENT.name, ROUTES.DEBUG.name, MENU.SAMPLE_CLIENT);
menuRight.insert(ROUTES.SAMPLE_SERVER.name, ROUTES.DEBUG.name, MENU.SAMPLE_SERVER);

export { menuLeft, menuRight };
