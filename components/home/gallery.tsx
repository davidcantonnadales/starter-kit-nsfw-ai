"use client";
import React, { useEffect, useRef } from "react";
import Isotope from "isotope-layout";
import Image from "next/image";

export default function Gallery() {
  const isotope = useRef<Isotope | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const iso = (isotope.current = new Isotope(".main-iso", {
        itemSelector: ".item",
        layoutMode: "fitRows",
      }));

      const filterButtons =
        document.querySelectorAll<HTMLLIElement>(".iso-nav ul li");
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          iso.arrange({
            filter: button.getAttribute("data-filter") || undefined,
          });

          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        });
      });
    }
  }, []);

  return (
    <div className="gallery-wrapper gallery-2" id="examples">
      <div className="gallery-heading">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title text-start">
                <span>recent Portfolio</span>
                <h2>Happy Creator Generated beautiful AI Art</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="iso-nav">
                <ul>
                  <li className="active" data-filter="*">
                    all
                  </li>
                  <li data-filter=".realistic">Ultra-Realistic</li>
                  <li data-filter=".anime">anime</li>
                  <li data-filter=".disney">Disney Pixar</li>
                  <li data-filter=".nsfw">NSFW +18</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="main-iso row justify-content-center">
          <div className="item realistic col-xl-3 col-lg-4 col-md-6">
            <div className="image-wrap">
              <Image
                height="0"
                width="0"
                src="/assets/image/portfolio-gallery/1.png"
                sizes="100vw"
                alt="Portfolio Image"
              />
            </div>
            <div className="hover-content">
              <span>Concept Art</span>
              <h3>spaceship landing</h3>
            </div>
          </div>
          <div className="item anime col-xl-4 col-lg-4 col-md-6">
            <div className="image-wrap">
              <Image
                height="0"
                width="0"
                src="/assets/image/portfolio-gallery/2.png"
                sizes="100vw"
                alt="Portfolio Image"
              />
            </div>
            <div className="hover-content">
              <span>Anime</span>
              <h3>Girl in Anime Style</h3>
            </div>
          </div>
          <div className="item disney col-xl-5 col-lg-4 col-md-6">
            <div className="image-wrap">
              <Image
                height="0"
                width="0"
                src="/assets/image/portfolio-gallery/3.png"
                sizes="100vh"
                alt="Portfolio Image"
                priority
              />
            </div>
            <div className="hover-content">
              <span>Disney Pixar</span>
              <h3>Girl in Disney Style</h3>
            </div>
          </div>
          <div className="item  nsfw col-xl-5 col-lg-4 col-md-6">
            <div className="image-wrap">
              <Image
                height="0"
                width="0"
                src="/assets/image/portfolio-gallery/4.png"
                sizes="100vw"
                alt="Portfolio Image"
              />
            </div>
            <div className="hover-content">
              <span>NSFW +18</span>
              <h3>Hentai Young women</h3>
            </div>
          </div>
          <div className="item disney col-xl-4 col-lg-4 col-md-6">
            <div className="image-wrap">
              <Image
                height="0"
                width="0"
                src="/assets/image/portfolio-gallery/5.png"
                sizes="100vw"
                alt="Portfolio Image"
              />
            </div>
            <div className="hover-content">
              <span>Disney Pixar</span>
              <h3>Young Brunette Girl</h3>
            </div>
          </div>
          <div className="item nsfw col-xl-3 col-lg-4 col-md-6">
            <div className="image-wrap">
              <Image
                height="0"
                width="0"
                src="/assets/image/portfolio-gallery/6.png"
                sizes="100vw"
                alt="Portfolio Image"
              />
            </div>
            <div className="hover-content">
              <span>Uncensored NSFW +18</span>
              <h3>Ultra-realistic image for adults</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
