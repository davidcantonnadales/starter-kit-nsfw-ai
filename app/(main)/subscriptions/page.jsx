// pages/subscriptions.js
"use client";

import { useState, useEffect } from "react";
import { useFirebaseApp } from "reactfire";
import PricingCard from "../../../components/subscriptions/pricing-card";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import {
  getProducts,
  getStripePayments,
  createCheckoutSession,
} from "@invertase/firestore-stripe-payments";

const SubscriptionPage = () => {
  useEffect(() => {
    logCustomEvent("Subscriptions Page Loaded", {});
  });

  const app = useFirebaseApp();

  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "users",
  });

  const pricing = [
    {
      id: 1,
      title: "Basic",
      price: "3,99€",
      features: [
        "40 images per month",
        "NSFW +18 Content",
        "No ADS",
        "30 days of image hosting",
      ],
      priceId: "price_1PeEnLCzLBVSjS837kmtW6pc",
    },
    {
      id: 2,
      title: "Premium",
      price: "8,99€",
      features: [
        "100 images per month",
        "NSFW +18 Content",
        "No ADS",
        "30 days of image hosting",
      ],
      priceId: "price_1PeEodCzLBVSjS83BnGkryII",
    },
    {
      id: 3,
      title: "Ultra",
      price: "14,99€",
      features: [
        "Unlimited images per month",
        "Lora Models",
        "NSFW +18 Content",
        "Multiple generation at once",
        "No ADS",
        "Unlimited image hosting",
      ],
      priceId: "price_1PeEpWCzLBVSjS83kGgAOuLZ",
    },
  ];

  const subscribe = async (priceId) => {
    try {
      logCustomEvent("Subscription card clicked", {
        content_type: "subscription",
        content_id: priceId,
      });

      const session = await createCheckoutSession(payments, {
        price: priceId,
        allow_promotion_codes: true,
        automatic_tax: true,
        tax_id_collection: true,
        success_url: `${window.location.origin}/app/subscriptions/success`,
        cancel_url: `${window.location.origin}/app/subscriptions/error`,
      });

      window.location.assign(session.url);
    } catch (error) {
      if (
        error
          .toString()
          .includes("Failed to determine currently signed in user")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You need to be logged in to subscribe.",
        });
        return;
      }
      console.log(error);
    }
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
      });
      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#00BFFF"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );

  return (
    <div className="pricing-section pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span>Pricing Package</span>
          <h2>Simple &amp; Flexible Pricing Package for you</h2>
        </div>
        <div className="row">
          {/* pricing start */}
          {pricing?.slice(0, 4).map((item, i) => (
            <div key={i} className="col-xl-4 col-lg-4 col-md-4">
              <PricingCard data={item} subscribe={subscribe} />
            </div>
          ))}
          {/* pricing end */}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
