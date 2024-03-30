import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

export default authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes: ["/site", "/api/uploadthing"],
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
    // rewrite for domain
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    let hostname = req.headers;
    let pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    // if subdomain exists
    const customSubDomain = hostname.get("host")?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`).filter(Boolean)[0];
    if (customSubDomain) {
      return NextResponse.rewrite(new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)); // redirect to [domain]/[pathId]
    }

    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
    }

    if (url.pathname === "/" || (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)) {
      return NextResponse.rewrite(new URL(`/site`, req.url));
    }

    if (url.pathname.startsWith("/agency") || url.pathname.startsWith("subaccount")) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }
  },
  // Prevent the specified routes from accessing
  // authentication information:
  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// When user tries to acces a sub-domain, we check if the sub-domain exist
// If it does, we redirect to [domain]/[pathId]
// If it doesn't, we check if is accessing sign-in or sign-up page
// If it is, we let it go through
// If it isn't, we check if is trying to access the landing page / or /site
// If it is, we let it go through
// If it isn't, we check if is trying to access the dashboards
// If it is, we redirect to the desired path
