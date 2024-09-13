import { WorkingType } from "../types/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: WorkingType;
  index: number;
}

export default function WorkingCard({ data, index }: Props) {
  return (
    <div className="single-working-p">
      <div className="icon">
        <Image
          height={44}
          width={46}
          src={data.icon[0]}
          alt="Icon Image"
          className="h-auto w-auto"
        />
        <Image
          height={100}
          width={100}
          src={data.icon[1]}
          alt="Shape Image"
          className="h-auto w-auto"
        />
        <Image
          height={44}
          width={46}
          src={data.icon[2]}
          alt="Shape Image"
          className="h-auto w-auto"
        />
        <Image
          height={100}
          width={100}
          src={data.icon[3]}
          alt="Shape Image"
          className="h-auto w-auto"
        />
      </div>
      <Link href="/">
        <h3>{data.title}</h3>
      </Link>
      <p>{data.brief}</p>
      <div className="count">
        <span>0{index + 1}</span>
      </div>
    </div>
  );
}
