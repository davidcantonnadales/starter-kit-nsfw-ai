import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import authenticate from "../../../lib/middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      await db
        .collection("gallery")
        .doc(id as string)
        .delete();
      res.status(200).json({ message: "Creation deleted successfully" });
    } catch (error) {
      console.error("Error deleting creation:", error);
      res.status(500).json({ error: "Failed to delete creation" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(handler);
