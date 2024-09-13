import { imgStyle } from "../data/data";
import Image from "next/image";
import Link from "next/link";

export default function Describe() {
  return (
    <div className="describe-section pt-100 bg-color-2" id="how">
      <div className="section-title section-title-2">
        <h2>¿How does it work?</h2>
      </div>
      <div className="container">
        <div className="describe-wrap bg-color-3">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-wrap">
                <Image
                  height="0"
                  width="0"
                  src="/assets/image/describe/img-one.png"
                  alt="Image"
                  sizes="100vw"
                />
              </div>
            </div>

            <div className="col-lg-7 align-self-center">
              <div className="describe-details">
                <h3>Example of how we operate</h3>
                <form className="form-wrapper d-flex">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    disabled
                    placeholder="A sexy brunette girl, with red shirt"
                  />
                  <i className="ri-pencil-line" />
                  <button type="submit" className="custom-btn" disabled>
                    generate
                  </button>
                </form>
                <div className="select-style">
                  <div className="head">
                    <span>choose a style</span>
                    <span className="more-option-btn float-end">
                      More models{" "}
                      <Image
                        height={10}
                        width={13}
                        src="/assets/image/describe/right-icon.png"
                        alt="Right Icon"
                      />
                    </span>
                  </div>
                  <div className="body-img text-center">
                    <div className="row">
                      {/* image style start */}
                      {imgStyle?.map((item, i) => (
                        <div key={i} className="col">
                          <div className="style-one">
                            <Image
                              height="0"
                              width="0"
                              sizes="100vw"
                              src={item.imgUrl}
                              alt="Image One"
                              className="h-auto w-100"
                            />

                            <p>{item.name}</p>
                          </div>
                        </div>
                      ))}
                      {/* image style end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shape">
        <Image
          height="0"
          width="0"
          sizes="100vw"
          src="/assets/image/describe/shape.png"
          alt="Shape Image"
        />
      </div>
    </div>
  );
}
