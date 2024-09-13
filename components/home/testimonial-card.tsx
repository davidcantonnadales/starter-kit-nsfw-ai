import { TestimonialType } from "../types/types";
import Image from "next/image";

interface Props {
  data: TestimonialType;
}

export default function TestimonialCard({ data }: Props) {
  return (
    <div className="slider-item">
      <div className="row">
        <div className="col-lg-4">
          <div className="single-client">
            <div className="image-wrap">
              <Image
                height={363}
                width={326}
                src={data.img[0]}
                alt="Client Image"
              />
              <Image
                height={345}
                width={310}
                src={data.img[1]}
                alt="Client Image"
              />

              <Image
                height={327}
                width={293}
                src={data.img[2]}
                alt="Client Image"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-8 align-self-center">
          <div className="single-client">
            <ul className="rating">
              <li>
                <i className="ri-star-s-fill" />
              </li>
              <li>
                <i className="ri-star-s-fill" />
              </li>
              <li>
                <i className="ri-star-s-fill" />
              </li>
              <li>
                <i className="ri-star-s-fill" />
              </li>
              <li>
                <i className="ri-star-s-fill" />
              </li>
            </ul>
            <p>{data.brief}</p>
            <div className="author-details">
              <h3>{data.name}</h3>
              <span>{data.profession}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
