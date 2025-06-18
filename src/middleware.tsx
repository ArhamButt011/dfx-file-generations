// import { NextRequest, NextResponse } from "next/server";

// const isAppUnderDevelopment = true; // Change to false when app is ready

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow access to the root page, Next.js assets, API routes, images, and videos from the >
//   if (
//     isAppUnderDevelopment &&
//     pathname !== "/" && // Allow only the root
//     !pathname.startsWith("/_next/") && // Allow Next.js static assets
//     !pathname.startsWith("/api/") && // Allow API routes
//     !pathname.startsWith("/images/") &&
//     !pathname.startsWith("/video/")
//   ) {
//     console.log(`Redirecting ${pathname} to /`);
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/:path*",
// };

// middleware.ts (at project root or under /pages depending on your version)

import { NextRequest, NextResponse } from "next/server";

const isAppUnderDevelopment = true;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAppUnderDevelopment) {
    const isAllowedPath =
      ["/coming-soon"].includes(pathname) ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/video/") ||
      pathname.startsWith("/favicon.ico");

    if (!isAllowedPath) {
      const url = req.nextUrl.clone();
      url.pathname = "/coming-soon";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
