import db from "@libs/server/db";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { userId },
  } = req;
  if (!userId) return;
  const findUser = await db.user.findMany({
    where: {
      userId: {
        startsWith: userId.toString(),
      },
    },
    select: { userId: true, avatar: true, bio: true },
  });
  // 해당 유저의 유무에 따라 있으면 user데이터를 보내고 없으면 보내지 않음
  // 유저가 없을 경우 findUser의 length는 0(false), 있을 경우 1부터 n까지(true)

  if (findUser.length) {
    res.json({ ok: true, findUser });
  } else {
    res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
