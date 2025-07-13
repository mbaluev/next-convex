import { CTree } from '@/lib/utils/tree';
import { TRouteDTO, ROUTES } from '@/lib/settings/routes';

const menuLeft = new CTree<TRouteDTO>();
menuLeft.insert(ROUTES.DASHBOARD.name, menuLeft.root.id, { ...ROUTES.DASHBOARD });
menuLeft.insert(ROUTES.FILES.name, menuLeft.root.id, { ...ROUTES.FILES });
menuLeft.insert(ROUTES.DEPOSITORY.name, menuLeft.root.id, { ...ROUTES.DEPOSITORY });

const menuRight = new CTree<TRouteDTO>();
menuRight.insert(ROUTES.PROFILE.name, menuRight.root.id, { ...ROUTES.PROFILE });
menuRight.insert(ROUTES.DEBUG.name, menuRight.root.id, { ...ROUTES.DEBUG });
menuRight.insert(ROUTES.SAMPLE_CLIENT.name, ROUTES.DEBUG.name, { ...ROUTES.SAMPLE_CLIENT });
menuRight.insert(ROUTES.SAMPLE_SERVER.name, ROUTES.DEBUG.name, { ...ROUTES.SAMPLE_SERVER });

export { menuLeft, menuRight };
