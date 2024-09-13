export interface FeatureType {
  icon: string[];
  title: string;
  brief: string;
}

export interface WorkingType {
  icon: string[];
  title: string;
  brief: string;
}

export interface ServiceType {
  bgImage: string;
  icon: string[];
  title: string;
  brief: string;
}

export interface TestimonialType {
  img: string[];
  brief: string;
  name: string;
  profession: string;
}

export interface BlogType {
  img: string;
  title: string;
}

export interface ImgStyleType {
  imgUrl: string;
  path: string;
  name: string;
}

export interface TeamType {
  imgUrl: string;
  name: string;
  profession: string;
}

export interface PricingType {
  plan: string;
  priceId: string;
  price: string;
  features: string[];
  title: string;
  description: string;
}

export interface ShopCategoryType {
  name: string;
  total: number;
  path: string;
}

export interface SingleProductType {
  imgUrl: string;
  title: string;
  price: number;
}

export interface ProductType extends SingleProductType {
  id: number;
  rating: number;
  category: string[];
  quantity?: number;
}

export interface PopularPostsType {
  imgUrl: string;
  title: string;
}

export interface Blog2Type {
  imgUrl?: string;
  title: string;
  brief: string;
}
