import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="about-section ptb-100 about-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 align-self-center">
            <div className="single-about">
              <div className="image-wrap image-wrap-2 row">
                <div className="col-6">
                  <div className="left-box">
                    <Image
                      height={500}
                      width={500}
                      src="/assets/image/about/about-2/1.png"
                      alt="Aixa AI feature"
                      sizes="100vw"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="right-box">
                    <Image
                      height={500}
                      width={500}
                      src="/assets/image/about/about-2/2.png"
                      alt="AI generated artwork"
                      sizes="100vw"
                    />
                    <Image
                      height={500}
                      width={500}
                      src="/assets/image/about/about-2/3.png"
                      alt="Creative AI art"
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="single-about">
              <div className="section-title section-title-2">
                <span>Welcome to Aixa AI</span>
                <h2>Easily create your dream concept images</h2>
                <p>
                  Aixa AI allows you to generate stunning images with just a few
                  clicks. Our advanced AI technology provides endless
                  possibilities for creativity. Start your journey with us and
                  bring your imagination to life.
                </p>
              </div>
              <div className="item-list">
                <div className="content-wrap">
                  <div className="icon">
                    <Image
                      height={40}
                      width={40}
                      src="/assets/image/about/icon-1.svg"
                      alt="Unlimited creations icon"
                    />
                    <Image
                      height={70}
                      width={80}
                      src="/assets/image/about/icon-shape.png"
                      alt="Icon background"
                    />
                  </div>
                  <h3>Unlimited Creating Opportunity</h3>
                </div>
                <p>
                  Explore unlimited creative possibilities with Aixa AI.
                  Generate unique artworks, enhance your designs, and much more.
                </p>
              </div>
              <div className="item-list">
                <div className="content-wrap">
                  <div className="icon">
                    <Image
                      height={40}
                      width={40}
                      src="/assets/image/about/icon-2.svg"
                      alt="Image to image art icon"
                    />
                    <Image
                      height={70}
                      width={80}
                      src="/assets/image/about/icon-shape.png"
                      alt="Icon background"
                    />
                  </div>
                  <h3>Image To Image Art Generator</h3>
                </div>
                <p>
                  Transform your existing images into new, AI-generated
                  artworks. Perfect for creative professionals and enthusiasts.
                </p>
              </div>
              <Link href="/login" className="custom-btn">
                Convinced? Get Started now for free
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="shape">
        <Image
          height={0}
          width={0}
          src="/assets/image/about/shape-1.png"
          alt="Decorative shape"
          sizes="100vw"
        />
        <Image
          height={0}
          width={0}
          src="/assets/image/about/shape-2.png"
          alt="Decorative shape"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
