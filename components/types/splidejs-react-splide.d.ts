declare module "@splidejs/react-splide" {
  import { ComponentType } from "react";

  interface SplideProps {
    options?: Record<string, any>;
    [key: string]: any;
  }

  interface SplideSlideProps {
    [key: string]: any;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
