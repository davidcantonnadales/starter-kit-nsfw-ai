import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { db } from "../../lib/firebaseAdmin";
import authenticate from "../../lib/middleware/authenticate";
import { GenerateResponse } from "@/lib/models/GenerateResponse";
import { Timestamp } from "firebase/firestore";

const saveError = async (
  model: string,
  negativePrompt: string,
  prompt: string,
  where: string
) => {
  await db.collection("errors").add({
    model,
    prompt,
    negativePrompt,
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    model,
    prompt,
    isPublic = false,
    lora,
    isNSFW = false,
    negativePrompt,
    improveHumanBody,
    size = "Portrait",
  } = req.body;
  const userId = (req as any).user.uid;

  let width = 1024;
  let height = 1024;

  switch (size) {
    case "Portrait":
      width = 768;
      height = 1024;
      break;
    case "Landscape":
      width = 1024;
      height = 768;
      break;
    case "Square":
      width = 1024;
      height = 1024;
      break;
  }

  let data = {
    extra: {
      response_image_type: "jpeg",
      enable_nsfw_detection: false,
      enterprise_plan: {
        enabled: false,
      },
    },
    request: {
      model_name: model,
      prompt: prompt,
      negative_prompt: negativePrompt || "",
      width,
      height,
      image_num: 1,
      steps: 40,
      seed: -1,
      clip_skip: 1,
      guidance_scale: 7.5,
      sampler_name: "Euler a",
      loras: [],
      embeddings: [
        {
          model_name: "badhandv4_16755.pt",
        },
        {
          model_name: "BadDream_53202.pt",
        },
        {
          model_name: "negative_hand-neg_43127.pt",
        },
        {
          model_name: "UnrealisticDream_53204.pt",
        },
        // {
        //   model_name: "bad_prompt_version2-neg_42594.pt",
        // },
        {
          model_name: "easynegative_8955.safetensors",
        },

        // {
        //   model_name: "epiCPhotoGasm-colorfulPhoto-neg_108119.pt",
        // },
      ],
    },
  };

  if (lora) {
    (data.request.loras as any).push({
      model_name: lora.sd_name,
      strength: 0.7,
    });
  }

  try {
    const response = await axios.post(
      "https://api.novita.ai/v3/async/txt2img",
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = response.data;

    const taskId = responseData.task_id;

    console.log(taskId);

    // Download the image and convert to base64

    let apiResponse: GenerateResponse = {
      id: taskId,
      status: "TASK_STATUS_PROCESSING",
      output: [],
      isPublic,
      createdAt: new Date(),
    };

    await db
      .collection("gallery")
      .doc(taskId)
      .set({
        processed: false,
        model: model,
        prompt: prompt,
        negativePrompt: negativePrompt || "",
        lora: lora ? lora.sd_name : "",
        isImg2Img: false,
        userId,
        createdAt: new Date(),
      });

    if (apiResponse.status === "TASK_STATUS_FAILED") {
      console.error("Error generating image:", apiResponse);
    }

    res.json(apiResponse);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

export default authenticate(handler);
