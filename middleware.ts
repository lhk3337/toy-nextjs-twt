import { NextFetchEvent, NextRequest, NextResponse, userAgent } from "next/server";

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (userAgent(req).isBot) {
    // return new Response("Plz don't be a bot. Be human",{status:403});
  }

  if (!req.url.includes("/api")) {
    if (!req.cookies.has("userSession") && !req.url.includes("/home")) {
      req.nextUrl.pathname = "/home";
      return NextResponse.redirect(req.nextUrl);
    }
    if (
      (req.cookies.has("userSession") && req.url.includes("/home")) ||
      req.url.includes("/log-in") ||
      req.url.includes("/create-account")
    ) {
      req.nextUrl.pathname = "/";
      return NextResponse.redirect(req.nextUrl);
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
