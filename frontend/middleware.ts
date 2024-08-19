import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import {
  isProtectedAdminRoute,
  isProtectedRoute,
  toBeRedirectedAdminRoutes,
  toBeRedirectedRoutes,
} from "./utils/routes";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Improved matcher for static assets
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const tokenVerified = await verifyToken("token", req);

  // Protected Routes logic - redirect to login if it doesn't have token in localstorage
  const isProtected = isProtectedRoute(pathname);
  if (isProtected && !tokenVerified) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ToBeRedirected Routes logic - redirect to feed if it has token in localstorage
  const toBeRedirected = toBeRedirectedRoutes(pathname);
  console.log({ toBeRedirected, tokenVerified });

  if (toBeRedirected && tokenVerified) {
    console.log(toBeRedirected, tokenVerified);

    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};

async function verifyToken(
  tokenName: string,
  req: NextRequest
): Promise<boolean> {
  const token = req.cookies.get(tokenName);
  console.log({token});
  
  if (!token?.value) {
    return false;
  }

  const secret = process.env.JWT_SECRET;
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
    } else {
    }

    return Boolean(payload);
  } catch (err: any) {
    console.log(`failed to verify ${tokenName}`, err.message);
    return false;
  }
}
