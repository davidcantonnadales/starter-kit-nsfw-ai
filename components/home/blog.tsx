import BlogCard2 from "./blog-card-2";
import { blog } from "../data/data";
import Image from "next/image";

export default function Blog() {
  return (
    <div className="blog-section-wrap pt-100 blog-section-two">
      <div className="container">
        <div className="section-title section-title-2">
          <span>recent articles</span>
          <h2>Latest story &amp; News Don’t Missing Any update</h2>
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
        <div className="row justify-content-center">
          {/* blog start */}
          {blog?.slice(0, 3).map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <BlogCard2 data={item} />
            </div>
          ))}
          {/* blog end */}
        </div>
      </div>
    </div>
  );
}
