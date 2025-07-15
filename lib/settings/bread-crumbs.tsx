'use client';

import { TRouteDTO, ROUTES } from '@/lib/settings/routes';

const BREAD_CRUMBS: Record<string, TRouteDTO[]> = {};
BREAD_CRUMBS[ROUTES.HOME.path] = [];
BREAD_CRUMBS[ROUTES.DASHBOARD.path] = [ROUTES.DASHBOARD];
BREAD_CRUMBS[ROUTES.PROFILE.path] = [ROUTES.PROFILE];
BREAD_CRUMBS[ROUTES.DEBUG.path] = [ROUTES.DEBUG];

export { BREAD_CRUMBS };
