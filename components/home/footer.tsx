import Image from "next/image";
import Link from "next/link";
import FooterCopyright from "./footer-copyright";

const quickLinks = [
  {
    name: "About us",
    path: "/",
  },
  {
    name: "Opportunity",
    path: "/",
  },
  {
    name: "Events",
    path: "/",
  },
  {
    name: "Consulting",
    path: "/",
  },
  {
    name: "Support",
    path: "/",
  },
  {
    name: "Member Login",
    path: "/",
  },
  {
    name: "Privacy",
    path: "/",
  },
  {
    name: "Contents",
    path: "/",
  },
];

const resources = [
  {
    name: "Stable Diffusion",
    path: "/",
  },
  {
    name: "Buy Credits",
    path: "/",
  },
  {
    name: "Name Generator",
    path: "/",
  },
  {
    name: "Game Assets",
    path: "/",
  },
  {
    name: "Art Gallery",
    path: "/",
  },
  {
    name: "Pricing Plan",
    path: "/",
  },
  {
    name: "NFT Generator",
    path: "/",
  },
];

const instagram = [
  {
    img: "/assets/image/footer/1.png",
    path: "/",
  },
  {
    img: "/assets/image/footer/2.png",
    path: "/",
  },
  {
    img: "/assets/image/footer/3.png",
    path: "/",
  },
  {
    img: "/assets/image/footer/4.png",
    path: "/",
  },
];

export default function Footer() {
  return (
    <footer className="footer-area">
      {/* <div className="footer-top ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="single-widget">
                <div className="contact-area">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        height={42}
                        width={151}
                        src="/assets/image/Logo.png"
                        alt="Logo Image"
                      />
                    </Link>
                  </div>
                  <p>
                    Leo site ultrices donec a volutpat penatibus mind suscipit
                    faucibus and duis pharetra name sociosqu phasellus nunce
                    accumsan
                  </p>
                  <form className="form-wrap">
                    <input
                      type="email"
                      className="form-control"
                      id="email2"
                      placeholder="enter your email"
                      required
                    />
                    <div className="button-wrap">
                      <button type="submit" className="submit-btn">
                        subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-6 col-md-4">
              <div className="single-widget ml-20">
                <h2>quick links</h2>
                <ul className="quick-links">
          
                  {quickLinks?.map((item, i) => (
                    <li key={i}>
                      <Link href={item.path}>
                        <i className="ri-arrow-drop-right-fill" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
     
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-6 col-md-6">
              <div className="single-widget">
                <h2>Resources</h2>
                <ul className="quick-links">
         
                  {resources?.map((item, i) => (
                    <li key={i}>
                      <Link href={item.path}>
                        <i className="ri-arrow-drop-right-fill" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
             
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="single-widget">
                <h2>instagram</h2>
                <ul className="instagram-link">
              
                  {instagram?.map((item, i) => (
                    <li key={i}>
                      <Image
                        height="0"
                        width="0"
                        src={item.img}
                        alt="Image"
                        sizes="100vw"
                      />
                      <div className="image-hover">
                        <Link href={item.path}>
                          <i className="ri-instagram-line" />
                        </Link>
                      </div>
                    </li>
                  ))}
           
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>  */}
      {/* footer copyright start */}
      <FooterCopyright />
      {/* footer copyright end */}
      <div className="shape-wrap">
        <Image
          height="0"
          width="0"
          src="/assets/image/footer/shape-bg.png"
          alt="Shape Image"
          sizes="100vw"
          priority
        />
        <Image
          height="0"
          width="0"
          src="/assets/image/footer/shape-1.png"
          alt="Shape Image"
          sizes="100vw"
        />
        <Image
          height="0"
          width="0"
          src="/assets/image/footer/shape-2.png"
          alt="Shape Image"
          sizes="100vw"
        />
        <Image
          height="0"
          width="0"
          src="/assets/image/footer/shape-3.png"
          alt="Shape Image"
          sizes="100vw"
        />
      </div>
    </footer>
  );
}
