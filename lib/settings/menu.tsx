import {
  AppWindowMac,
  Code,
  LayoutDashboard,
  Laptop,
  OctagonX,
  HardDrive,
  SwatchBook,
  UserPen,
  FolderClosed,
  Banknote,
} from 'lucide-react';
import { CTree } from '@/lib/utils/tree';
import { TRouteDTO, ROUTES } from '@/lib/settings/routes';

const MENU: Record<string, TRouteDTO> = {
  DEBUG: { ...ROUTES.DEBUG, icon: <Code /> },
  PROFILE: { ...ROUTES.PROFILE, icon: <UserPen /> },
  DASHBOARD: { ...ROUTES.DASHBOARD, icon: <LayoutDashboard /> },
  DEPOSITORY: { ...ROUTES.DEPOSITORY, icon: <Banknote /> },
  FILES: { ...ROUTES.FILES, icon: <FolderClosed /> },
  SAMPLES: { ...ROUTES.SAMPLES, icon: <SwatchBook /> },
  SAMPLE_CLIENT: { ...ROUTES.SAMPLE_CLIENT, icon: <Laptop /> },
  SAMPLE_SERVER: { ...ROUTES.SAMPLE_SERVER, icon: <HardDrive /> },
  ERRORS: { ...ROUTES.ERRORS, icon: <AppWindowMac /> },
  NOT_FOUND: { ...ROUTES.NOT_FOUND, icon: <OctagonX /> },
};
const menuTree = new CTree<TRouteDTO>();
menuTree.insert(ROUTES.DEBUG.name, menuTree.root.id, MENU.DEBUG);
menuTree.insert(ROUTES.PROFILE.name, menuTree.root.id, MENU.PROFILE);
menuTree.insert(ROUTES.DASHBOARD.name, menuTree.root.id, MENU.DASHBOARD);
menuTree.insert(ROUTES.DEPOSITORY.name, menuTree.root.id, MENU.DEPOSITORY);
menuTree.insert(ROUTES.FILES.name, menuTree.root.id, MENU.FILES);
menuTree.insert(ROUTES.SAMPLE_CLIENT.name, menuTree.root.id, MENU.SAMPLE_CLIENT);
menuTree.insert(ROUTES.SAMPLE_SERVER.name, menuTree.root.id, MENU.SAMPLE_SERVER);
// menuTree.insert(ROUTES.SAMPLES.name, menuTree.root.id, MENU.SAMPLES);
// menuTree.insert(ROUTES.SAMPLE_CLIENT.name, ROUTES.SAMPLES.name, MENU.SAMPLE_CLIENT);
// menuTree.insert(ROUTES.SAMPLE_SERVER.name, ROUTES.SAMPLES.name, MENU.SAMPLE_SERVER);

export { menuTree };
