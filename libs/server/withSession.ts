import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { userId: any };
  }
}

const cookieOptions = {
  cookieName: "userSession",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
