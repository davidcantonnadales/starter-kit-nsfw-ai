import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NodeCache from "node-cache";
import authenticate from "../../lib/middleware/authenticate";
import { CommunityModelResponse } from "@/lib/models/CommunityModelResponse";

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query = "",
      page = 1,
      limit = 20,
      cursor = "",
      type = "checkpoint",
    } = req.query;
    const cacheKey = `search-models-${query}-${page}-${limit}-${cursor}-${type}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const response = await axios.get("https://api.novita.ai/v3/model", {
      params: {
        "filter.visibility": "public",
        "filter.name": query,
        "pagination.limit": limit,
        "pagination.cursor": cursor,
        "filter.types": type,
        "filter.source": "civitai",
        "filter.is_inpainting": false,
      },
      headers: {
        Authorization: `Bearer ${process.env.NOVITA_API_KEY}`,
      },
    });

    const { models, pagination } = response.data;

    const responseData = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      total: models.length,
      models: models.map((model: any) => new CommunityModelResponse(model)),
      next_cursor: pagination.next_cursor,
    };

    myCache.set(cacheKey, responseData, 3600);

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching model list" });
  }
};

export default authenticate(handler);
