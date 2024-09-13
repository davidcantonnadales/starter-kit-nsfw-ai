import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.collection("contact").add({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ error: "Failed to save message" });
  }
}
