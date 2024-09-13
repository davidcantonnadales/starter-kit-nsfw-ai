"use client";

import React, { useEffect, useState } from "react";
import Features from "../../components/home/features";
import About from "../../components/home/about";
import Describe from "../../components/home/describe";
import Headline from "../../components/home/headline";
import Hero from "../../components/home/hero";
import Footer from "../../components/home/footer";
import Header2 from "../../components/home/header-2";
import Testimonial from "../../components/home/testimonial";
import Working from "../../components/home/working";
import Faq from "../../components/home/faq";
import Services from "../../components/home/services";
import Art from "../../components/home/art";
import Blog from "../../components/home/blog";
import Pricing from "../../components/home/pricing";
import dynamic from "next/dynamic";
import { logCustomEvent } from "@/lib/analytics";
import AgeConfirmationPopup from "@/components/age/age-confirmation";

//import "../../app/globals.home.css";

const Gallery = dynamic(() => import("../../components/home/gallery"), {
  ssr: false,
});

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [isAdult, setIsAdult] = useState<boolean | null>(null);

  useEffect(() => {
    const savedIsAdult = localStorage.getItem("isAdult");
    if (!savedIsAdult) {
      setShowPopup(true);
    } else {
      setIsAdult(JSON.parse(savedIsAdult));
    }
  }, []);

  const handleAgeConfirmation = (isAdult: boolean) => {
    setIsAdult(isAdult);
    setShowPopup(false);
    localStorage.setItem("isAdult", JSON.stringify(isAdult));
    if (!isAdult) {
      window.location.href = "https://www.google.com"; // Redirige a otra página si el usuario no es adulto
    }
  };

  useEffect(() => {
    logCustomEvent("Home Page Loaded", {});
  });

  return (
    <>
      {showPopup && <AgeConfirmationPopup onConfirm={handleAgeConfirmation} />}
      <Hero />
      <Headline />
      <Describe />
      <About />
      <Headline />
      <Pricing />
      <Features />
      <Gallery />
      {/* <Testimonial /> */}
      <Working />
      {/* <Faq /> */}
      <Services />
      {/* <Art /> */}
      {/* <Blog /> */}
      {/* <Partner /> */}
      {/* <Footer /> */}
    </>
  );
}
