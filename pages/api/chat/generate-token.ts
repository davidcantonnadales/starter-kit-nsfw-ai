import { NextApiRequest, NextApiResponse } from "next";
import { StreamChat } from "stream-chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Define values.
  const api_key = process.env.CHAT_PROJECT_ID;
  const api_secret = process.env.CHAT_PROJECT_KEY;

  console.log("KEYS", api_key, api_secret);
  const { user_id } = req.body;

  if (!api_key || !api_secret) {
    return res.status(500).json({
      error: "API key and secret must be set in environment variables.",
    });
  }

  if (!user_id) {
    return res
      .status(400)
      .json({ error: "User ID must be provided in the request body." });
  }

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  try {
    // Create User Token
    const token = serverClient.createToken(user_id);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error creating token:", error);
    return res.status(500).json({ error: "Error creating token" });
  }
}
