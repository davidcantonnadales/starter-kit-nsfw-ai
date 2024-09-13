// import type { NextApiRequest, NextApiResponse } from "next";
// import NodeCache from "node-cache";
// import { db, bucket } from "../../lib/firebaseAdmin";
// import authenticate from "../../lib/middleware/authenticate";
// import { GenerateResponse } from "@/lib/models/GenerateResponse";
// import { v4 as uuidv4 } from "uuid";

// const uploadImageToStorage = async (base64Image: string, id: string) => {
//   const buffer = Buffer.from(base64Image.split(",")[1], "base64");
//   const fileName = `images/${id}-${uuidv4()}.jpg`;
//   const file = bucket.file(fileName);
//   await file.save(buffer, {
//     contentType: "image/jpeg",
//   });

//   await file.makePublic();

//   return file.publicUrl();
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const creationsSnapshot = await db.collection("gallery").get();

//     const creations = await Promise.all(
//       creationsSnapshot.docs.map(
//         async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
//           const data = doc.data() as GenerateResponse;

//           if (Array.isArray(data.output) && data.output.length > 0) {
//             const outputPromises = data.output.map(
//               async (output: string, index: number) => {
//                 if (output.startsWith("data:image")) {
//                   const publicUrl = await uploadImageToStorage(output, doc.id);
//                   data.output[index] = publicUrl;
//                 }
//               }
//             );
//             await Promise.all(outputPromises);

//             // Update Firestore document with new URLs
//             await db
//               .collection("gallery")
//               .doc(doc.id)
//               .update({ output: data.output });
//           }
//         }
//       )
//     );

//     res.status(200).json(creations);
//   } catch (error) {
//     console.error("Error fetching previous creations:", error);
//     res.status(500).json({ error: "Error fetching previous creations" });
//   }
// };

// export default handler;
