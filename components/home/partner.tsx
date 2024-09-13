"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const logos = [
    "/assets/image/partner-logo/1-hover.png",
    "/assets/image/partner-logo/2-hover.png",
    "/assets/image/partner-logo/3-hover.png",
    "/assets/image/partner-logo/4-hover.png",
    "/assets/image/partner-logo/5-hover.png",
    "/assets/image/partner-logo/1-hover.png",
    "/assets/image/partner-logo/2-hover.png",
    "/assets/image/partner-logo/3-hover.png",
    "/assets/image/partner-logo/4-hover.png",
    "/assets/image/partner-logo/5-hover.png",
];

export default function Partner() {
    return (
        <div className="partner-logo ptb-100 bg-color-3">
            <div className="container">
                <div className="logo-slider logo-slider-two">
                    <Swiper
                        spaceBetween={30}
                        modules={[Autoplay]}
                        autoplay={{ delay: 2500 }}
                        loop={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            575: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            992: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        {/* logo start */}
                        {logos?.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="img-wrap">
                                    <Image
                                        height={52}
                                        width={169}
                                        src={item}
                                        alt="Logo Image"
                                        className="m-auto h-100 w-auto"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                        {/* logo end */}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
