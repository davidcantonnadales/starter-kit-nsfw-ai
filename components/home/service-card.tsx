import { ServiceType } from "../types/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: ServiceType;
}

export default function ServiceCard({ data }: Props) {
  return (
    <div className="single-service">
      <div className="image-wrap">
        <Image
          width="0"
          height="0"
          src={data.bgImage}
          alt="Image"
          sizes="100vw"
          className="w-full h-auto"
        />
        <div className="image-content">
          <div className="content-item">
            <div className="icon">
              <Image
                height={42}
                width={44}
                src={data.icon[0]}
                alt="Icon Image"
              />
              <Image
                height={90}
                width={98}
                src={data.icon[1]}
                alt="Shape Image"
              />
            </div>
            <p>{data.brief}</p>
            <Link href="/single-service" className="view-more">
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
          <div className="title">
            <Link href="/single-service">
              <h3>{data.title}</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
