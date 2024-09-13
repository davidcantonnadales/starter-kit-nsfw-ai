import type { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { db } from "../../../lib/firebaseAdmin";
import authenticate from "../../../lib/middleware/authenticate";

const cache = new NodeCache({ stdTTL: 60 }); // Cache TTL is set to 60 seconds (1 minute)

interface Creation {
  id: string;
  output: string[];
  createdAt: Date;
  isPublic: boolean;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing user ID" });
  }

  try {
    // Check if cached data is available
    const cachedCreations = cache.get<Creation[]>(`creations_${userId}`);

    if (cachedCreations) {
      return res.status(200).json(cachedCreations);
    }

    const creationsSnapshot = await db
      .collection("gallery")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const creations = creationsSnapshot.docs
      .map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = doc.data();

        return {
          id: doc.id,
          output: data.output,
          createdAt: data.createdAt,
          isPublic: data.isPublic,
        } as Creation;
      })
      .filter(
        (creation: Creation) =>
          Array.isArray(creation.output) && creation.output.length > 0
      ); // Filter creations with output

    // Cache the data
    cache.set(`creations_${userId}`, creations);

    res.status(200).json(creations);
  } catch (error) {
    console.error("Error fetching previous creations:", error);
    res.status(500).json({ error: "Error fetching previous creations" });
  }
};

export default authenticate(handler);
