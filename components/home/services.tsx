import ServiceCard from "./service-card";
import { services } from "../data/data";

export default function Services() {
  return (
    <div className="services-section pb-70 service-section-two">
      <div className="container">
        <div className="section-title section-title-2">
          <span>Popular Service</span>
          <h2>Artificial intelligence will make us stronger</h2>
        </div>
        <div className="row justify-content-center">
          {/* services start */}
          {services?.slice(0, 3).map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <ServiceCard data={item} />
            </div>
          ))}
          {/* services end */}
        </div>
      </div>
    </div>
  );
}
