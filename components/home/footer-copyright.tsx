import Link from "next/link";

const social = [
  {
    icon: "ri-instagram-fill",
    path: "https://instagram.com/aixa.app",
  },
];

export default function FooterCopyright() {
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="single-f-bottom-widget">
              <p>
                Copyright © {new Date().getFullYear()} by{" "}
                <Link href="https://aixa.app">Aixa AI</Link>. All Rights
                Reserved.
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <ul className="social-network">
              {/* social start */}
              {social?.map((item, i) => (
                <li key={i}>
                  <Link href={item.path}>
                    <i className={item.icon} />
                  </Link>
                </li>
              ))}
              {/* social end */}
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="important-link">
              <ul>
                <li>
                  <Link href="/privacy-policy">Privacy &amp; Policy</Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions">Terms and Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
