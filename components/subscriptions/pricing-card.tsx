import { PricingType } from "../types/types";
import { Button } from "@radix-ui/themes";

interface Props {
  data: PricingType;
  subscribe: (priceId: string) => void;
}

const PricingCard: React.FC<Props> = ({ data, subscribe }) => {
  const subscribeNow = (data: PricingType) => {
    console.log(data);

    subscribe(data.priceId);
  };

  return (
    <div className="single-pricing">
      <div className="pricing-content">
        <div className="price-head">
          <p>{data.plan}</p>
          <h3>{data.price}/mo</h3>
        </div>
        <div className="price-body">
          <ul>
            {data.features.map((feature, index) => (
              <li key={index}>
                <i className="ri-check-line" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="price-bottom">
          <Button
            className="p-2 bg-blue-600 text-white rounded m-2"
            onClick={() => subscribeNow(data)}
          >
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
