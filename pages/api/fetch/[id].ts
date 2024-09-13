import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db, bucket } from "../../../lib/firebaseAdmin";
import authenticate from "../../../lib/middleware/authenticate";
import { GenerateResponse } from "@/lib/models/GenerateResponse";
import { v4 as uuidv4 } from "uuid";

const uploadImageToStorage = async (imageBuffer: Buffer, id: string) => {
  const fileName = `images/${id}-${uuidv4()}.jpg`;
  const file = bucket.file(fileName);
  await file.save(imageBuffer, {
    contentType: "image/jpeg",
  });

  await file.makePublic();

  return file.publicUrl();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  let generationLimit = 0;

  try {
    const response = await axios.get(
      `https://api.novita.ai/v3/async/task-result?task_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let output: string[] = [];

    if (Array.isArray(response.data.images)) {
      // Fetch the image content from the URLs in the output array and upload to Firebase Storage
      const outputPromises = response.data.images.map(async (image: any) => {
        const imageResponse = await axios.get(image.image_url, {
          responseType: "arraybuffer",
        });
        const imageBuffer = Buffer.from(imageResponse.data, "binary");
        const publicUrl = await uploadImageToStorage(imageBuffer, id);
        return publicUrl;
      });

      output = await Promise.all(outputPromises);
    } else {
      console.error("Images array is not valid", response.data.images);
    }

    let apiResponse: GenerateResponse = {
      id: id,
      status: response.data.task.status,
      output: output,
      isPublic: false,
    };

    const docRef = db.collection("gallery").doc(apiResponse.id.toString());
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      // Document does not exist, create it with processed flag as false
      await docRef.set({
        ...apiResponse,
        processed: false,
      });
    } else {
      const docData = docSnapshot.data();
      apiResponse.isPublic = docData?.isPublic || false;

      if (apiResponse.status === "TASK_STATUS_SUCCEED" && !docData?.processed) {
        // Decrement the generation count if not already processed
        const userRef = db.collection("users").doc(docData!.userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          generationLimit = userData?.generationLimit;

          // Check if the generation limit is greater than zero
          if (generationLimit > 0) {
            generationLimit--;

            // Update the user's generation limit
            await userRef.update({
              generationLimit,
            });
          }
        }
        // Mark as processed
        await docRef.update({
          processed: true,
        });
      } else {
        // Update the document without changing the processed flag

        await docRef.update({ ...apiResponse });
      }

      if (apiResponse.status === "TASK_STATUS_FAILED") {
        console.error("Error generating image:", apiResponse);
      }
    }

    res.json(apiResponse);
  } catch (error) {
    console.error("Error generating image:", error);
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default authenticate(handler);
