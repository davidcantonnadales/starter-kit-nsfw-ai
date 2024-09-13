import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebaseAdmin";
import authenticate from "../../../lib/middleware/authenticate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).body.uid;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch the user document from Firestore
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();

    const generationLimit = userData!.generationLimit || 0;
    const maxGenerationLimit = userData!.maxGenerationLimit || 0;

    return res.status(200).json({ generationLimit, maxGenerationLimit });
  } catch (error) {
    console.error("Error fetching user generations:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default authenticate(handler);
