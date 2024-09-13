import React from "react";
import Link from "next/link";
import "../subscriptions.callback.css";
import { Button, buttonVariants } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="page error-page">
      <h1>Error in your Payment</h1>
      <p>There was a problem processing your payment. Please try again.</p>
      <Link href="/app/subscriptions">
        <Button className={buttonVariants()}>
          {" "}
          Back to Subscriptions Page
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
