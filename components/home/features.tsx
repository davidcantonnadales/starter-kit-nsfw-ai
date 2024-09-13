import FeatureCard from "./feature-card";
import { features } from "../data/data";
import Image from "next/image";

export default function Features() {
  return (
    <div className="features-section-wrap pt-100 pb-70 feature-s-2" id="why">
      <div className="container">
        <div className="section-title section-title-2">
          <span>exclusive feature</span>
          <h2>Artificial intelligence will make us stronger</h2>
          <div className="section-shape">
            <Image
              height="0"
              width="0"
              src="/assets/image/section-shape/section-title-shape.png"
              alt="Shape Image"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="row">
          {/* features start */}
          {features?.slice(0, 4).map((item, i) => (
            <div key={i} className="col-xl-3 col-lg-6 col-md-6">
              <FeatureCard data={item} />
            </div>
          ))}
          {/* features end */}
        </div>
      </div>
    </div>
  );
}
