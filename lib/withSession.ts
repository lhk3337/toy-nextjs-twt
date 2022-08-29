import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { userId: any };
  }
}

const cookieOptions = {
  cookieName: "userSession",
  password: "haerkfuyagwekuygw4akuy4gt876tgukyga",
};
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
