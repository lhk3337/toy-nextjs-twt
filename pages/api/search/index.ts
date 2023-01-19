import db from "@libs/server/db";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { userId },
  } = req;

  const findUser = await db.user.findMany({
    where: {
      userId: {
        search: userId?.toString(), // search term
      },
    },
  });
  res.json({ ok: true, findUser });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
