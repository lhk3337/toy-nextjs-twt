import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const {
      session: { user },
    } = req;
    if (!user) return res.status(400).json({ ok: false });
    const users = await db.user.findUnique({
      where: { id: user?.id },
      select: { userId: true, id: true, name: true, bio: true, location: true, website: true, createdAt: true },
    });

    return res.json({
      ok: true,
      user: users,
    });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { bio, website, name, location },
    } = req;

    const userUpdate = async (reqBody: string, userInfoField: string) => {
      if (reqBody) {
        await db.user.update({
          where: { id: user?.id },
          data: { [userInfoField]: reqBody },
        });
      } else {
        await db.user.update({
          where: { id: user?.id },
          data: userInfoField === "name" ? { [userInfoField]: "Anonymous" } : { [userInfoField]: "" },
        });
      }
    };

    await userUpdate(website, "website");
    await userUpdate(bio, "bio");
    await userUpdate(name, "name");
    await userUpdate(location, "location");

    res.json({ ok: true });
  }
}
export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
