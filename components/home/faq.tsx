"use client";
import FaqAccordion from "./faq-accordion";
import Fancybox from "./fancybox";
import Image from "next/image";
import CountUp from "react-countup";

export default function Faq() {
  return (
    <div className="faq-counter-section pb-100 faq-two">
      <div className="container">
        <div className="row">
          <div className="col-xl-2 col-lg-6 col-md-4">
            <div className="single-fq-c counter-wrap">
              <div className="counter-item">
                <div className="icon">
                  <Image
                    height={61}
                    width={60}
                    src="/assets/image/faq-counter/counter-logo-2.png"
                    alt="Logo Image"
                  />
                  <p>Happy Customer</p>
                  <h3>
                    <span className="counter">
                      <CountUp enableScrollSpy={true} end={52} />
                    </span>
                    K
                  </h3>
                </div>
              </div>
              <div className="counter-item">
                <div className="icon">
                  <Image
                    height={61}
                    width={60}
                    src="/assets/image/faq-counter/counter-logo-2.png"
                    alt="Logo Image"
                  />
                  <p>Generated Image</p>
                  <h3>
                    <span className="counter">
                      <CountUp enableScrollSpy={true} end={22} />
                    </span>
                    M
                  </h3>
                </div>
              </div>
              <div className="counter-item">
                <div className="icon">
                  <Image
                    height={61}
                    width={60}
                    src="/assets/image/faq-counter/counter-logo-2.png"
                    alt="Logo Image"
                  />
                  <p>Customer Rating</p>
                  <h3>
                    <span className="counter" />
                    8/10
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="single-fq-c">
              <div className="image-wrap">
                <Image
                  height={764}
                  width={526}
                  src="/assets/image/faq-counter/image-2.png"
                  alt="Image"
                />

                {/* fancybox start */}
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-12 col-md-12">
            <div className="single-fq-c">
              <div className="fq-wrap">
                <div className="section-title section-title-2">
                  <span>Asked questions</span>
                  <h2>Aixa AI - Frequently Asked Questions</h2>
                  <p>
                    Find answers to the most frequently asked questions about
                    Aixa AI.
                  </p>
                </div>
                {/* faq accordion start */}
                <FaqAccordion />
                {/* faq accordion end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
