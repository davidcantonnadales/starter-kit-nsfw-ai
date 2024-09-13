import type { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { db } from "../../lib/firebaseAdmin";
import authenticate from "../../lib/middleware/authenticate";
import {
  GenerateResponse,
  GenerateResponseRequest,
} from "@/lib/models/GenerateResponse";

const cache = new NodeCache({ stdTTL: 300 }); // Cache TTL is set to 300 seconds (5 minutes)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId as string;

  try {
    // Check if cached data is available
    const cachedCreations = cache.get<GenerateResponse[]>(
      `creations_${userId}`
    );

    if (cachedCreations) {
      return res.status(200).json(cachedCreations);
    }

    const creationsSnapshot = await db
      .collection("gallery")
      .where("isPublic", "==", true)
      .orderBy("createdAt", "desc")
      .get();

    const creations = creationsSnapshot.docs
      .map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
        } as GenerateResponse;
      })
      .filter(
        (creation: GenerateResponse) =>
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
