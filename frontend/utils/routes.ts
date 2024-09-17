const protectedRoutes = new Set(["/profile"]);

const paymentRoute = /^\/payment\/[^/]+\/?.*$/;

const changeToHomeRoutes = new Set(["/login", "/signup"]);

export function isProtectedRoute(pathname: string): boolean {
  // console.log(pathname);
  
  return protectedRoutes.has(pathname) ||
  paymentRoute.test(pathname);
}

export function toBeRedirectedRoutes(pathname: string): boolean {
  return changeToHomeRoutes.has(pathname) && paymentRoute.test(pathname);
}

// Admin side;

const changeToAdminDashboardRoutes = new Set([
  "/admin/dashboard",
  "/admin/approval",
]);

export function isProtectedAdminRoute(pathname: string): boolean {
  return changeToAdminDashboardRoutes.has(pathname);
}

export function toBeRedirectedAdminRoutes(pathname: string): boolean {
  return !changeToAdminDashboardRoutes.has(pathname);
}

// Company side;

const changeToCompanyDashboardRoutes = new Set([
  "/company/dashboard",
  "/company/addTrip",
  "/company/trips",
  "/company/categorys",
  "/company/addCategory",
]);

const EditTripRoutePattern = /^\/company\/editTrip\/[^/]+\/?.*$/;
const EditCategoryRoutePattern = /^\/company\/editCategory\/[^/]+\/?.*$/;

export function isProtectedCompanyRoute(pathname: string): boolean {
  return (
    changeToCompanyDashboardRoutes.has(pathname) ||
    EditTripRoutePattern.test(pathname) ||
    EditCategoryRoutePattern.test(pathname)
  );
}

export function toBeRedirectedCompanyRoutes(pathname: string): boolean {
  return (
    !changeToCompanyDashboardRoutes.has(pathname) &&
    !EditTripRoutePattern.test(pathname) &&
    !EditCategoryRoutePattern.test(pathname)
  );
}
