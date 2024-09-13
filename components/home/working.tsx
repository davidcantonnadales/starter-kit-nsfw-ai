import WorkingCard from "./working-card";
import { working } from "../data/data";
import Image from "next/image";

export default function Working() {
  return (
    <div className="working-process pt-100 pb-70 w-process-2">
      <div className="container">
        <div className="section-title section-title-2">
          <span>working process</span>
          <h2>Revolution the business world through AI</h2>
          <div className="section-shape">
            <Image
              height="0"
              width="0"
              src="/assets/image/section-shape/section-title-shape.png"
              alt="Shape Image"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="row">
          {/* working start */}
          {working?.slice(0, 4).map((item, i) => (
            <div key={i} className="col-xl-3 col-lg-6 col-md-6">
              <WorkingCard data={item} index={i} />
            </div>
          ))}
          {/* working end */}
        </div>
      </div>
      <div className="shape">
        <Image
          height="0"
          width="0"
          src="/assets/image/working-process/1.png"
          alt="Shape Image"
          sizes="100vw"
        />
        <Image
          height="0"
          width="0"
          src="/assets/image/working-process/2.png"
          alt="Shape Image"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
