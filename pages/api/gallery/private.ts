import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import authenticate from "../../../lib/middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing creation ID" });
    }

    try {
      const creationRef = db.collection("gallery").doc(id as string);
      const doc = await creationRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: "Creation not found" });
      }

      await creationRef.update({
        isPublic: false,
      });

      res.status(200).json({ message: "Creation made public successfully" });
    } catch (error) {
      console.error("Error making creation public:", error);
      res.status(500).json({ error: "Failed to make creation public" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(handler);
