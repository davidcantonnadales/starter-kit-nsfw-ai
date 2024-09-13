import { BlogType } from "../types/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: BlogType;
}

export default function BlogCard2({ data }: Props) {
  return (
    <div className="single-blog">
      <div className="image-wrap">
        <Image height="0" width="0" sizes="100vh" src={data.img} alt="Image" />
      </div>
      <div className="content-wrap">
        <ul className="top">
          <li className="category">
            <Image
              height={14}
              width={14}
              src="/assets/image/blog/reduse-2.png"
              alt="Image Icon"
              style={{
                height: "14px",
                width: "14px",
              }}
            />
            <span>gaming</span>
          </li>
          <li className="date">
            <Image
              height={16}
              width={14}
              src="/assets/image/blog/date-2.png"
              alt="Image Icon"
            />
            <span>25 July, 2023</span>
          </li>
        </ul>
        <Link href="/single-blog">
          <h3>{data.title}</h3>
        </Link>
        <Link href="/single-blog" className="read-more-btn">
          <i className="ri-subtract-fill" />
          read more
        </Link>
      </div>
    </div>
  );
}
