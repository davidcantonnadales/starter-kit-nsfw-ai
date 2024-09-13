import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { auth } from "../firebaseAdmin";

const authenticate =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    try {
      const decodedToken = await auth.verifyIdToken(token);
      (req as any).user = decodedToken;
      return handler(req, res);
    } catch (error: any) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

export default authenticate;
