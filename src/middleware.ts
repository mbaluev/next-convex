import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/auth/routes';
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

const isAuthRoute = createRouteMatcher([...authRoutes]);
const isPublicRoute = createRouteMatcher([...authRoutes, ...publicRoutes]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const is_auth = await convexAuth.isAuthenticated();
  if (isAuthRoute(request) && is_auth) {
    return nextjsMiddlewareRedirect(request, DEFAULT_LOGIN_REDIRECT);
  }
  if (!isPublicRoute(request) && !is_auth) {
    return nextjsMiddlewareRedirect(request, '/auth/login');
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
