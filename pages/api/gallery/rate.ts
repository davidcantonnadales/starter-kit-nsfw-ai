import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import authenticate from "../../../lib/middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, type } = req.body;

  if (!id || !type || (type !== "like" && type !== "dislike")) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const docRef = db.collection("gallery").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Document not found" });
    }

    const currentData = doc.data();
    const likes = currentData?.likes || 0;
    const dislikes = currentData?.dislikes || 0;

    const updatedData = {
      likes: type === "like" ? likes + 1 : likes,
      dislikes: type === "dislike" ? dislikes + 1 : dislikes,
    };

    await docRef.update(updatedData);

    return res.status(200).json({ message: "Rating updated successfully" });
  } catch (error) {
    console.error("Error updating rating:", error);
    return res.status(500).json({ error: "Error updating rating" });
  }
};

export default authenticate(handler);
