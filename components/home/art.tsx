import Image from "next/image";
import Link from "next/link";

export default function Art() {
  return (
    <div className="free-art">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="single-free-art content-wrap">
              <div className="section-title">
                <span>free generate art</span>
                <h2>Everything you generate simple Process</h2>
                <p>
                  Good our you're form one second good and after every behold
                  moved seed moved grass firmament multiply
                </p>
              </div>
              <form className="form-wrap">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="enter your email"
                  required
                />
                <div className="button-wrap">
                  <button type="submit" className="submit-btn">
                    <i className="ri-send-plane-fill" />
                  </button>
                  <Link href="/" className="custom-btn">
                    free access
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="single-free-art">
              <div className="image-wrap">
                <div className="one-col">
                  <Image
                    height="0"
                    width="0"
                    sizes="100vw"
                    src="/assets/image/free-art/1.png"
                    alt="Image One"
                    className="h-auto w-100"
                  />
                  <Image
                    height="0"
                    width="0"
                    sizes="100vw"
                    src="/assets/image/free-art/2.png"
                    alt="Image Two"
                    className="h-auto w-100"
                  />
                </div>
                <div className="two-col">
                  <Image
                    height="0"
                    width="0"
                    sizes="100vw"
                    src="/assets/image/free-art/3.png"
                    alt="Image Three"
                    className="h-auto w-100"
                  />
                  <Image
                    height="0"
                    width="0"
                    sizes="100vw"
                    src="/assets/image/free-art/4.png"
                    alt="Image Four"
                    className="h-auto w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shape">
        <Image
          height={61}
          width={59}
          src="/assets/image/free-art/shape.png"
          alt="Shape Image"
        />
        <Image
          height={61}
          width={59}
          src="/assets/image/free-art/shape.png"
          alt="Shape Image"
        />
      </div>
    </div>
  );
}
