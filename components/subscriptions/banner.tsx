import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  path: {
    name: string;
    path?: string;
  }[];
}

export default function Banner({ title, path }: Props) {
  return (
    <div className="inner-page-banner bg-image">
      <div className="shape-all">
        <Image
          height="0"
          width="0"
          src="/assets/image/inner-p-banner/1.png"
          alt="Shape Image"
          sizes="100vw"
        />
        <Image
          height="0"
          width="0"
          src="/assets/image/inner-p-banner/2.png"
          alt="Shape Image"
          sizes="100vw"
        />
        <Image
          height="0"
          width="0"
          src="/assets/image/inner-p-banner/3.png"
          alt="Shape Image"
          sizes="100vw"
        />
      </div>
      <div className="container">
        <div className="banner-content">
          <h1>{title}</h1>
          <ul className="page-marker">
            <li>
              <Link href={path[0].path as string}>{path[0].name}</Link>
              <span> - {path[1].name}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
