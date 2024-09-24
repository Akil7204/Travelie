import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import {
  isProtectedAdminRoute,
  isProtectedCompanyRoute,
  isProtectedRoute,
  toBeRedirectedAdminRoutes,
  toBeRedirectedCompanyRoutes,
  toBeRedirectedRoutes,
} from "./utils/routes";
import { isBlockedApi } from "./app/services/allAPI";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Improved matcher for static assets
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

    const adminTokenVerified = await verifyToken("adminToken", req);

    const isProtectedAdmin = isProtectedAdminRoute(pathname);
    
    if (isProtectedAdmin && !adminTokenVerified) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    const toBeRedirectedAdmin = toBeRedirectedAdminRoutes(pathname);
    if (toBeRedirectedAdmin && adminTokenVerified) {
      const feedUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(feedUrl);
    }
    
    // company side
    const CompanyTokenVerified = await verifyToken("companyToken", req);

    const isProtectedCompany = isProtectedCompanyRoute(pathname);
    if(isProtectedCompany && !CompanyTokenVerified){
      const loginUrl = new URL("/company/signin", req.url);
      return NextResponse.redirect(loginUrl);
    }

    const toBeRedirectedCompany = toBeRedirectedCompanyRoutes(pathname);
    if(toBeRedirectedCompany && CompanyTokenVerified){
      const feedUrl = new URL("/company/dashboard", req.url);
      return NextResponse.redirect(feedUrl);
    }



  const tokenVerified = await verifyToken("token", req);

 
  const isProtected = isProtectedRoute(pathname);
  // console.log("isprotucted",isProtected);
  // console.log("token is : ", tokenVerified);
  
  
  if (isProtected && !tokenVerified) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  
  const toBeRedirected = toBeRedirectedRoutes(pathname);

  if (toBeRedirected && tokenVerified) {

    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

async function verifyToken(
  companyToken: string,
  req: NextRequest
): Promise<boolean> {
  const token = req.cookies.get(companyToken);

  if (!token?.value) {
    return false;
  }

  const secret = process.env.JWT_SECRET_KEY;
  
  if (!secret) {
    console.log("JWT secret not found in env");
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(secret)
    );

    if (payload) {
      try {
        // const result = await isBlockedApi(payload.userId);
        // console.log(result);
        
      } catch (error) {
        console.log(error);
        
      }

    } else {
    }
    return Boolean(payload);
  } catch (err: any) {
    console.log(`failed to verify ${companyToken}`, err.message);
    return false;
  }
}


