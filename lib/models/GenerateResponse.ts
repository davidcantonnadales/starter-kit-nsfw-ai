import { Timestamp } from "firebase/firestore";

export class GenerateResponseRequest {
  request: {
    model_name: string;
    prompt: string;
    negative_prompt?: string;
    width: number;
    height: number;
    image_num: number;
    steps: number;
    seed: number;
    clip_skip: number;
    guidance_scale: number;
    sampler_name: string;
  };

  constructor(
    model_name: string,
    prompt: string,
    width: number,
    height: number,
    image_num: number,
    steps: number,
    seed: number,
    clip_skip: number,
    guidance_scale: number,
    sampler_name: string,
    negativePrompt?: string
  ) {
    this.request = {
      model_name,
      prompt,
      negative_prompt: negativePrompt || "",
      width,
      height,
      image_num,
      steps,
      seed,
      clip_skip,
      guidance_scale,
      sampler_name,
    };
  }
}

export class GenerateResponse {
  id: string;
  status: string;
  output: string[] = [];
  isPublic: boolean = false;
  prompt?: string;
  request?: GenerateResponseRequest;
  createdAt?: Date;

  constructor(
    id: string,
    status: string,
    output: string[] = [],
    isPublic: boolean = false,
    prompt?: string,
    request?: GenerateResponseRequest,
    createdAt?: Date
  ) {
    this.id = id;
    this.status = status;
    this.output = output;
    this.isPublic = isPublic;
    this.prompt = prompt;
    this.request = request;
    this.createdAt = createdAt;
  }
}
