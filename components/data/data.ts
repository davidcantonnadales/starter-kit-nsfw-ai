import {
  Blog2Type,
  BlogType,
  FeatureType,
  ImgStyleType,
  PopularPostsType,
  PricingType,
  ProductType,
  ServiceType,
  ShopCategoryType,
  SingleProductType,
  TeamType,
  TestimonialType,
  WorkingType,
} from "../types/types";

export const features: FeatureType[] = [
  {
    icon: [
      "/assets/image/features/icon-1.svg",
      "/assets/image/features/shape.png",
      "/assets/image/features/icon-1-hover.svg",
      "/assets/image/features/shape-hover.png",
    ],
    title: "Innovative Delivery",
    brief:
      "Get your creative visions delivered swiftly and accurately with our advanced AI-driven solutions, including NSFW and explicit content generation.",
  },
  {
    icon: [
      "/assets/image/features/icon-2.svg",
      "/assets/image/features/shape.png",
      "/assets/image/features/icon-2-hover.svg",
      "/assets/image/features/shape-hover.png",
    ],
    title: "Rapid Image Generation",
    brief:
      "Transform text prompts into stunning visuals in seconds, enabling you to iterate faster and more efficiently. Our technology supports both SFW and NSFW content.",
  },
  {
    icon: [
      "/assets/image/features/icon-3.svg",
      "/assets/image/features/shape.png",
      "/assets/image/features/icon-3-hover.svg",
      "/assets/image/features/shape-hover.png",
    ],
    title: "Unique Resources",
    brief:
      "Access a unique set of tools and models designed to cater to a wide range of creative needs and styles, including explicit and 18+ image generation.",
  },
  {
    icon: [
      "/assets/image/features/icon-4.svg",
      "/assets/image/features/shape.png",
      "/assets/image/features/icon-4-hover.svg",
      "/assets/image/features/shape-hover.png",
    ],
    title: "Data-Driven Insights",
    brief:
      "Utilize our data analytics to gain insights and refine your creative processes for better outcomes. Ensure your NSFW content meets audience expectations.",
  },
];

export const working: WorkingType[] = [
  {
    icon: [
      "/assets/image/working-process/icon-1.svg",
      "/assets/image/working-process/shape.png",
      "/assets/image/working-process/icon-1-hover.svg",
      "/assets/image/working-process/shape-hover.png",
    ],
    title: "Data Collection",
    brief:
      "Collect comprehensive data to fuel your projects and ensure the highest quality results, whether for SFW or NSFW content.",
  },
  {
    icon: [
      "/assets/image/working-process/icon-2.svg",
      "/assets/image/working-process/shape.png",
      "/assets/image/working-process/icon-2-hover.svg",
      "/assets/image/working-process/shape-hover.png",
    ],
    title: "Data Analysis",
    brief:
      "Analyze your data to extract meaningful patterns and insights that drive better decision-making for both SFW and NSFW projects.",
  },
  {
    icon: [
      "/assets/image/working-process/icon-3.svg",
      "/assets/image/working-process/shape.png",
      "/assets/image/working-process/icon-3-hover.svg",
      "/assets/image/working-process/shape-hover.png",
    ],
    title: "Model Building",
    brief:
      "Build and train models tailored to your specific needs, ensuring high performance and accuracy in generating explicit and non-explicit content.",
  },
  {
    icon: [
      "/assets/image/working-process/icon-4.svg",
      "/assets/image/working-process/shape.png",
      "/assets/image/working-process/icon-4-hover.svg",
      "/assets/image/working-process/shape-hover.png",
    ],
    title: "Generate Outputs",
    brief:
      "Deploy your models to generate high-quality outputs, transforming your ideas into reality, including the creation of explicit and 18+ images.",
  },
];

export const services: ServiceType[] = [
  {
    bgImage: "/assets/image/services/img-1.png",
    icon: [
      "/assets/image/services/icon.svg",
      "/assets/image/services/shape.png",
    ],
    title: "Text to Image Generator",
    brief:
      "Transform your text prompts into stunning images with our state-of-the-art AI technology, supporting NSFW content generation.",
  },
  {
    bgImage: "/assets/image/services/img-2.png",
    icon: [
      "/assets/image/services/icon.svg",
      "/assets/image/services/shape.png",
    ],
    title: "Custom Image Creation",
    brief:
      "Create bespoke images tailored to your unique requirements and preferences, including explicit content without censorship.",
  },
  {
    bgImage: "/assets/image/services/img-3.png",
    icon: [
      "/assets/image/services/icon.svg",
      "/assets/image/services/shape.png",
    ],
    title: "Creative Consulting",
    brief:
      "Get expert advice and support to enhance your creative projects and achieve your vision, whether for SFW or NSFW content.",
  },
];

export const testimonial: TestimonialType[] = [
  {
    img: [
      "/assets/image/testimonial/1.png",
      "/assets/image/testimonial/2.png",
      "/assets/image/testimonial/3.png",
    ],
    brief: `Aixa AI has revolutionized our creative process. The ability to generate high-quality images from text prompts, including NSFW content, has saved us countless hours and sparked new levels of creativity.`,
    name: "Herbert Martinez",
    profession: "HR Manager",
  },
  {
    img: [
      "/assets/image/testimonial/2.png",
      "/assets/image/testimonial/1.png",
      "/assets/image/testimonial/3.png",
    ],
    brief: `The tools provided by Aixa AI are incredibly powerful and easy to use. We've been able to push the boundaries of what's possible with our designs, especially with explicit content generation.`,
    name: "Samantha Green",
    profession: "Creative Director",
  },
  {
    img: [
      "/assets/image/testimonial/1.png",
      "/assets/image/testimonial/2.png",
      "/assets/image/testimonial/3.png",
    ],
    brief: `Using Aixa AI's platform has been a game changer for our marketing campaigns. The quick turnaround and quality of the generated images, both SFW and NSFW, are unmatched.`,
    name: "John Doe",
    profession: "Marketing Manager",
  },
  {
    img: [
      "/assets/image/testimonial/3.png",
      "/assets/image/testimonial/1.png",
      "/assets/image/testimonial/2.png",
    ],
    brief: `Aixa AI provides an invaluable resource for our team. The AI-generated images are always top-notch, helping us deliver better results faster, including high-quality 18+ images.`,
    name: "Emily Smith",
    profession: "Content Creator",
  },
];

export const blog: BlogType[] = [
  {
    img: "/assets/image/blog/1.png",
    title: "Unlocking Creativity with AI: Aixa AI's Journey",
  },
  {
    img: "/assets/image/blog/2.png",
    title: "How AI is Transforming the Creative Industry",
  },
  {
    img: "/assets/image/blog/3.png",
    title: "10 Tips for Maximizing Your Creative Workflow with Aixa AI",
  },
];

export const imgStyle: ImgStyleType[] = [
  {
    imgUrl: "/assets/image/describe/1.png",
    path: "/home-2",
    name: "Concept Art",
  },
  {
    imgUrl: "/assets/image/describe/2.png",
    path: "/home-2",
    name: "Anime Style",
  },
  {
    imgUrl: "/assets/image/describe/3.png",
    path: "/home-2",
    name: "Photorealistic",
  },
  {
    imgUrl: "/assets/image/describe/4.png",
    path: "/home-2",
    name: "Digital Painting",
  },
  {
    imgUrl: "/assets/image/describe/5.png",
    path: "/home-2",
    name: "NSFW +18",
  },
];

export const team: TeamType[] = [
  {
    imgUrl: "/assets/image/team/1.png",
    name: "Elvira T. Hazen",
    profession: "Senior Designer",
  },
  {
    imgUrl: "/assets/image/team/2.png",
    name: "Misty D. Leman",
    profession: "CEO & Founder",
  },
  {
    imgUrl: "/assets/image/team/3.png",
    name: "Elsa W. Burke",
    profession: "Marketing Manager",
  },
  {
    imgUrl: "/assets/image/team/4.png",
    name: "Elvira T. Hazen",
    profession: "Freelancer",
  },
  {
    imgUrl: "/assets/image/team/5.png",
    name: "Edith D. Cope",
    profession: "UI/UX Designer",
  },
  {
    imgUrl: "/assets/image/team/6.png",
    name: "Rose M. Hayes",
    profession: "Creative Director",
  },
  {
    imgUrl: "/assets/image/team/7.png",
    name: "Marco P. Upton",
    profession: "Web Developer",
  },
  {
    imgUrl: "/assets/image/team/8.png",
    name: "Reba T. Roman",
    profession: "Digital Marketer",
  },
];

export const teamSingleSidebar: TeamType[] = [
  {
    imgUrl: "/assets/image/team/1.png",
    name: "Elvira T. Hazen",
    profession: "UX/UI Designer",
  },
  {
    imgUrl: "/assets/image/team/2.png",
    name: "Misty D. Leman",
    profession: "Data Scientist",
  },
  {
    imgUrl: "/assets/image/team/3.png",
    name: "Elsa W. Burke",
    profession: "Frontend Developer",
  },
  {
    imgUrl: "/assets/image/team/4.png",
    name: "Pedro J. Chang",
    profession: "Software Engineer",
  },
  {
    imgUrl: "/assets/image/team/5.png",
    name: "Misty D. Leman",
    profession: "Business Analyst",
  },
];

export const shopCategory: ShopCategoryType[] = [
  {
    name: "Creative",
    total: 12,
    path: "/",
  },
  {
    name: "Anime",
    total: 10,
    path: "/",
  },
  {
    name: "Abstract",
    total: 8,
    path: "/",
  },
  {
    name: "Cartoon",
    total: 5,
    path: "/",
  },
  {
    name: "Illustration",
    total: 5,
    path: "/",
  },
  {
    name: "NSFW",
    total: 15,
    path: "/",
  },
];

export const products: ProductType[] = [
  {
    id: 1,
    imgUrl: "/assets/image/shop/products/1.png",
    rating: 5,
    title: "Portrait Of A Faun",
    price: 100,
    category: ["creative", "abstract"],
    quantity: 1,
  },
  {
    id: 2,
    imgUrl: "/assets/image/shop/products/2.png",
    rating: 3,
    title: "Pink Ballet Flower",
    price: 150,
    category: ["creative", "anime"],
    quantity: 1,
  },
  {
    id: 3,
    imgUrl: "/assets/image/shop/products/3.png",
    rating: 3,
    title: "Holographic Layering",
    price: 200,
    category: ["creative", "anime", "abstract"],
    quantity: 1,
  },
  {
    id: 4,
    imgUrl: "/assets/image/shop/products/4.png",
    rating: 4,
    title: "Gray Stone Art",
    price: 250,
    category: ["cartoon", "abstract"],
    quantity: 1,
  },
  {
    id: 5,
    imgUrl: "/assets/image/shop/products/5.png",
    rating: 3,
    title: "Explicit Artwork",
    price: 300,
    category: ["cartoon", "illustration", "NSFW"],
    quantity: 1,
  },
  {
    id: 6,
    imgUrl: "/assets/image/shop/products/6.png",
    rating: 5,
    title: "NSFW Fantasy",
    price: 350,
    category: ["cartoon", "illustration", "NSFW"],
    quantity: 1,
  },
  {
    id: 7,
    imgUrl: "/assets/image/shop/products/7.png",
    rating: 4,
    title: "Women Power",
    price: 400,
    category: ["illustration", "NSFW"],
    quantity: 1,
  },
  {
    id: 8,
    imgUrl: "/assets/image/shop/products/8.png",
    rating: 2,
    title: "Woman And Flower",
    price: 600,
    category: ["anime", "abstract"],
    quantity: 1,
  },
  {
    id: 9,
    imgUrl: "/assets/image/shop/products/9.png",
    rating: 5,
    title: "Creative Anime",
    price: 600,
    category: ["anime", "NSFW"],
    quantity: 1,
  },
];

export const recentProducts: SingleProductType[] = [
  {
    imgUrl: "/assets/image/shop/products/recent-product/1.png",
    title: "Abstract Tree",
    price: 52,
  },
  {
    imgUrl: "/assets/image/shop/products/recent-product/2.png",
    title: "Red Mermaid",
    price: 45,
  },
  {
    imgUrl: "/assets/image/shop/products/recent-product/3.png",
    title: "Colorful Kite",
    price: 42,
  },
  {
    imgUrl: "/assets/image/shop/products/recent-product/4.png",
    title: "Colorful Success",
    price: 22,
  },
];

export const popularPosts: PopularPostsType[] = [
  {
    title: "Unlocking the Potential of NSFW AI-Generated Content",
    imgUrl: "/assets/image/blog/rel-post-1.png",
  },
  {
    title: "The Rise of AI in the Creative Industry",
    imgUrl: "/assets/image/blog/rel-post-2.png",
  },
  {
    title: "How to Create Stunning Visuals with Aixa AI",
    imgUrl: "/assets/image/blog/rel-post-3.png",
  },
];

export const blog2: Blog2Type[] = [
  {
    imgUrl: "/assets/image/blog/4.png",
    title:
      "Grass Herb Called She'd Of Brought in Waters Good World Best Place.",
    brief:
      "Leo site ultrices donec a volutpat penatibus mind suscipit faucibus and duis pharetra name sociosqu phasellus nunce accumsan lectus morbi ridiculus.",
  },
  {
    imgUrl: "/assets/image/blog/5.png",
    title:
      "Can stars greater winged You'll together isn't itself was more cause.",
    brief:
      "Leo site ultrices donec a volutpat penatibus mind suscipit faucibus and duis pharetra name sociosqu phasellus nunce accumsan lectus morbi ridiculus.",
  },
  {
    imgUrl: "/assets/image/blog/6.png",
    title: "Great female Meat appears From so fruitful unto be lights.",
    brief:
      "Leo site ultrices donec a volutpat penatibus mind suscipit faucibus and duis pharetra name sociosqu phasellus nunce accumsan lectus morbi ridiculus.",
  },
  {
    imgUrl: "/assets/image/blog/7.png",
    title: "Open Over Rule Likeness Itself Male Own Grass May Off Subdue.",
    brief:
      "Leo site ultrices donec a volutpat penatibus mind suscipit faucibus and duis pharetra name sociosqu phasellus nunce accumsan lectus morbi ridiculus.",
  },
  {
    imgUrl: "/assets/image/blog/7.png",
    title: "Fly yielding man you'll Night grass gathered given divide signs.",
    brief:
      "Leo site ultrices donec a volutpat penatibus mind suscipit faucibus and duis pharetra name sociosqu phasellus nunce accumsan lectus morbi ridiculus.",
  },
];
