import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Parse the token
  const { pathname } = request.nextUrl; // Extract pathname

  // Allow unauthenticated users to access login and register
  if (!token && pathname === "/login" ){
    return NextResponse.next();
  }

  // Redirect authenticated users away from login and register
  if (token && pathname === "/login" ) {
    return NextResponse.redirect(new URL("/hosts-guests-by-age", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token && pathname !== "/login" ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow all other cases
  return NextResponse.next();
}

export const config = {
  matcher: ["/host-and-guest-by-location", "/login", "/protected-route"], // Define routes to protect
};