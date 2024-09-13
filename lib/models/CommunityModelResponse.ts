export class CommunityModelResponse {
  id: number;
  name: string;
  hash_sha256: string;
  sd_name: string;
  type: string;
  categories: string[];
  status: number;
  download_url: string;
  tags: string[];
  cover_url: string;
  source: string;
  base_model: string;
  base_model_type: string;
  download_url_ttl: number;
  sd_name_in_api: string;
  is_nsfw: boolean;
  is_sdxl: boolean;

  constructor(data: any) {
    this.id = data.id || 0;
    this.name = data.name || "";
    this.hash_sha256 = data.hash_sha256 || "";
    this.sd_name = data.sd_name || "";
    this.type = data.type?.display_name || "";
    this.categories = data.categories || [];
    this.status = data.status || 0;
    this.download_url = data.download_url || "";
    this.tags = data.tags || [];
    this.cover_url = data.cover_url || "";
    this.source = data.source || "";
    this.base_model = data.base_model || "";
    this.base_model_type = data.base_model_type || "";
    this.download_url_ttl = data.download_url_ttl || 0;
    this.sd_name_in_api = data.sd_name_in_api || "";
    this.is_nsfw = data.is_nsfw || false;
    this.is_sdxl = data.is_sdxl || false;
  }
}
