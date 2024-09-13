import { FeatureType } from "../types/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: FeatureType;
}

export default function FeatureCard({ data }: Props) {
  return (
    <div className="single-feature">
      <div className="image-wrap">
        <div className="icon">
          <Image
            height={43}
            width={39}
            src={data.icon[0]}
            className="ml-7 h-auto w-auto"
            alt="Icon Image"
          />
          <Image
            height={90}
            width={100}
            src={data.icon[1]}
            className="h-auto w-auto"
            alt="Shape Image"
          />
          <Image
            height={43}
            width={39}
            src={data.icon[2]}
            className="ml-7 h-auto w-auto"
            alt="Icon Image"
          />
          <Image
            height={90}
            width={100}
            src={data.icon[3]}
            className="h-auto w-auto"
            alt="Shape Image"
          />
        </div>
      </div>
      <Link href="/">
        <h3>{data.title}</h3>
      </Link>
      <p>{data.brief}</p>
    </div>
  );
}
