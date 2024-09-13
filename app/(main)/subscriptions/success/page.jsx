"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "../subscriptions.callback.css";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  onCurrentUserSubscriptionUpdate,
  getStripePayments,
} from "@invertase/firestore-stripe-payments";
import { useUser, useFirebaseApp } from "reactfire";

const SuccessPage = () => {
  const { data } = useUser();

  const app = useFirebaseApp();

  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "users",
  });

  useEffect(() => {
    if (!data) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      console.log(snapshot.changes);

      for (const change of snapshot.changes) {
        if (change.type === "added") {
          console.log(
            `New subscription added with ID: ${change.subscription.id}`
          );
        }
      }
    });
  }, []);

  return (
    <div className="page success-page">
      <h1>Successfull Payment</h1>
      <p>Your payment has been successfully processed.</p>
      <Link href="/app">
        <Button className={buttonVariants()}>Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default SuccessPage;
