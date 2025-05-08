import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;


  const superadminRoutes = ["/hosts-guests-by-age", "/snacks","/specific-symptoms","/host-stats","/relationship" , "/host-and-guest-by-location","/host-week-summary","/symptom-percentage-all-hosts","/package-management" , "/influencer" , "/deleted-users","/pii"];
  const influencer = ["/coupon-info"];

  if (!token && pathname === "/login") {
    return NextResponse.next();
  }

  if (token && pathname === "/login" && role == "superadmin") {
    return NextResponse.redirect(new URL("/hosts-guests-by-age", request.url));
  }

  if (token && pathname === "/login" && role == "superadmin") {
    return NextResponse.redirect(new URL("/coupon-info", request.url));
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (token) {
    if (role === "superadmin" && !superadminRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/hosts-guests-by-age", request.url));
    }

    if (role === "influencer" && !influencer.includes(pathname)) {
      return NextResponse.redirect(new URL("/coupon-info", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|json|txt|woff|woff2|ttf|eot)).*)',
  ], // Define routes to protect
};
