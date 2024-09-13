"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { testimonial } from "../data/data";
import Image from "next/image";
import TestimonialCard from "./testimonial-card";

export default function Testimonial() {
  return (
    <div className="testimonial-section pt-100 pb-100 testimonial-2">
      <div className="container">
        <div className="section-title">
          <span>Our testimonial</span>
          <h2>Happy client feedback about our service</h2>
        </div>
        <div className="slider-content">
          <Swiper
            className="mySwiper"
            effect={"fade"}
            modules={[EffectFade, Autoplay]}
            loop={true}
            autoplay={{
              delay: 3000,
              reverseDirection: true,
            }}
          >
            {testimonial?.map((item, i) => (
              <SwiperSlide key={i}>
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="shape">
        <Image
          height="0"
          width="0"
          sizes="100vh"
          src="/assets/image/testimonial/map-shape.png"
          alt="Shape Image"
        />
        <Image
          height={70}
          width={70}
          src="/assets/image/testimonial/shape-1.png"
          alt="Shape Image"
          style={{
            height: "70px",
            width: "70px",
          }}
        />
        <Image
          height={70}
          width={70}
          src="/assets/image/testimonial/shape-2.png"
          alt="Shape Image"
          style={{
            height: "70px",
            width: "70px",
          }}
        />
        <Image
          height={70}
          width={70}
          src="/assets/image/testimonial/shape-3.png"
          alt="Shape Image"
          style={{
            height: "70px",
            width: "70px",
          }}
        />
        <Image
          height={70}
          width={70}
          src="/assets/image/testimonial/shape-4.png"
          alt="Shape Image"
          style={{
            height: "70px",
            width: "70px",
          }}
        />
        <Image
          height={70}
          width={70}
          src="/assets/image/testimonial/shape-5.png"
          alt="Shape Image"
          style={{
            height: "70px",
            width: "70px",
          }}
        />
      </div>
    </div>
  );
}
