import { CTree } from '@/lib/utils/tree';
import { TRouteDTO, ROUTES } from '@/lib/settings/routes';

const menuLeft = new CTree<TRouteDTO>();
menuLeft.insert(ROUTES.DASHBOARD.name, menuLeft.root.id, { ...ROUTES.DASHBOARD });
menuLeft.insert(ROUTES.FILES.name, menuLeft.root.id, { ...ROUTES.FILES });
menuLeft.insert(ROUTES.DEPOSITORY.name, menuLeft.root.id, { ...ROUTES.DEPOSITORY });
menuLeft.insert(ROUTES.DEBUG.name, menuLeft.root.id, { ...ROUTES.DEBUG });

export { menuLeft };
