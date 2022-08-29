import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/withHandler";
import bcrypt from "bcryptjs";
import db from "../../lib/db";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;
  await db.user.create({
    data: {
      userId,
      password: bcrypt.hashSync(password, 10),
    },
  });

  res.status(200).end();
}

export default withHandler("POST", handler);
