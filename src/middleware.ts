import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/auth/routes';

const isAuthRoute = createRouteMatcher(authRoutes);
const isPublicRoute = createRouteMatcher(publicRoutes);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isAuthRoute(request)) {
    if (await convexAuth.isAuthenticated())
      return nextjsMiddlewareRedirect(request, DEFAULT_LOGIN_REDIRECT);
    return;
  }
  if (!(await convexAuth.isAuthenticated()) && !isPublicRoute(request)) {
    return nextjsMiddlewareRedirect(request, '/auth/login');
    // const { nextUrl } = request;
    // let callbackUrl = nextUrl.pathname;
    // if (nextUrl.search) callbackUrl += nextUrl.search;
    // return nextjsMiddlewareRedirect(request, `/auth/login?callbackUrl=${callbackUrl}`);
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
