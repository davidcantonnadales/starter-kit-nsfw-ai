import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="banner-two-section">
      <div className="particle-network-animation d-none" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-content items-center">
              <h1>Aixa AI: The Ultimate AI Art Generator</h1>
              <p>
                Experience the future of art with Aixa AI, the ultimate platform
                for generating stunning visuals, including NSFW and 18+ content.
                Transform your ideas into reality with ease and precision.
                Starting from just 3,99€ per month
              </p>
              <p>
                Register now and get 10 generations of images for free. No bank
                card required.
              </p>
              <Link href="/login" className="custom-btn">
                Register now for free
              </Link>
            </div>
          </div>
        </div>
        <div className="art-shape">
          <Image
            height="0"
            width="0"
            src="/assets/image/banner/banner-2/1.png"
            alt="Image One"
            sizes="100vw"
          />
          <Image
            height="0"
            width="0"
            src="/assets/image/banner/banner-2/2.png"
            alt="Image Two"
            sizes="100vw"
          />
          <Image
            height="0"
            width="0"
            src="/assets/image/banner/banner-2/3.png"
            alt="Image Three"
            sizes="100vw"
          />
          <Image
            height="0"
            width="0"
            src="/assets/image/banner/banner-2/4.png"
            alt="Image Four"
            sizes="100vw"
          />
          <Image
            height="0"
            width="0"
            src="/assets/image/banner/banner-2/shape.png"
            alt="Shape"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
