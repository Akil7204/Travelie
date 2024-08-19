const protectedRoutes = new Set(["/trips"]);

const changeToHomeRoutes = new Set(["/login", "/signup"]);

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.has(pathname);
}

export function toBeRedirectedRoutes(pathname: string): boolean {
  console.log({pathname  , changeToHomeRoutes, res: changeToHomeRoutes.has(pathname) });

  
  
  return changeToHomeRoutes.has(pathname);
}

// Admin side;

const changeToAdminDashboardRoutes = new Set([
  "/admin/dashboard",
  "/admin/approval",
]);

export function isProtectedAdminRoute(pathname: string): boolean {
  return !changeToAdminDashboardRoutes.has(pathname);
}

export function toBeRedirectedAdminRoutes(pathname: string): boolean {
  return changeToAdminDashboardRoutes.has(pathname);
}


// Company side; 

const changeToCompanyDashboardRoutes = new Set(["/company/dashboard", "/company/addtrip", "/company/trips"])
