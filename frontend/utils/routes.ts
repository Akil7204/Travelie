"use client"

const protectedRoutes = new Set(["/profile", "/chat", "/bookingSucessful", "/myTrips", "/wallet"]);

const paymentRoute = /^\/payment\/[^/]+\/?.*$/;

const changeToHomeRoutes = new Set(["/login", "/signup"]);

export function isProtectedRoute(pathname: string): boolean {

  return protectedRoutes.has(pathname) || paymentRoute.test(pathname);
}

export function toBeRedirectedRoutes(pathname: string): boolean {
  return changeToHomeRoutes.has(pathname) 
}

// Admin side;

const changeToAdminDashboardRoutes = new Set([
  "/admin/dashboard",
  "/admin/approval",
  "/admin/user",
  "/admin/company",
  "/admin/reports"
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
  "/company/chat",
  "/company/bookingList",
]);

const EditTripRoutePattern = /^\/company\/editTrip\/[^/]+\/?.*$/;
const EditCategoryRoutePattern = /^\/company\/editCategory\/[^/]+\/?.*$/;
const bookingRoutePattern = /^\/company\/bookingList\/[^/]+\/?.*$/;


export function isProtectedCompanyRoute(pathname: string): boolean {
  return (
    changeToCompanyDashboardRoutes.has(pathname) ||
    EditTripRoutePattern.test(pathname) ||
    EditCategoryRoutePattern.test(pathname) ||
    bookingRoutePattern.test(pathname)
  );
}

export function toBeRedirectedCompanyRoutes(pathname: string): boolean {
  return (
    !changeToCompanyDashboardRoutes.has(pathname) &&
    !EditTripRoutePattern.test(pathname) &&
    !EditCategoryRoutePattern.test(pathname) &&
    !bookingRoutePattern.test(pathname)
  );
}

export function exportToken(){
  return localStorage.getItem('token');
}
