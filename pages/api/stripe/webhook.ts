import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { db } from "../../../lib/firebaseAdmin";
import { Stripe } from "stripe";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

const freeGenerationLimit = 10;
const basicGenerationLimit = 40;
const premiumGenerationLimit = 100;
const ultraGenerationLimit = -1000;

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      let message = "Unknown error";

      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }

      console.error("Webhook signature verification failed.", message);
      return res.status(400).send(`Webhook Error: ${message}`);
    }

    // Handle the event
    switch (event.type) {
      case "invoice.payment_succeeded":
        const paymentIntent = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(paymentIntent);
        break;
      case "customer.created":
        const customerIntent = event.data.object as Stripe.Customer;
        await handleCustomerCreatedSucceeded(customerIntent);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;

const handlePaymentSucceeded = async (invoice: Stripe.Invoice) => {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0].price.id;

  let generationLimit;
  let maxGenerationLimit;

  //5
  if (priceId === "price_1PeEnLCzLBVSjS837kmtW6pc") {
    generationLimit = basicGenerationLimit;
    maxGenerationLimit = basicGenerationLimit;
  }
  //48
  else if (priceId === "price_1Pc5jLCzLBVSjS83kwL57a17") {
    generationLimit = basicGenerationLimit * 12;
    maxGenerationLimit = basicGenerationLimit * 12;
  }
  //10
  else if (priceId === "price_1PeEodCzLBVSjS83BnGkryII") {
    generationLimit = premiumGenerationLimit;
    maxGenerationLimit = premiumGenerationLimit;
  }
  //96
  else if (priceId === "price_1Pc5jRCzLBVSjS830ylTIJXn") {
    generationLimit = premiumGenerationLimit;
    maxGenerationLimit = premiumGenerationLimit * 12;
  } else {
    generationLimit = Infinity;
    maxGenerationLimit = ultraGenerationLimit;
  }

  // Fetch the user document using the stripeId
  const userSnapshot = await db
    .collection("users")
    .where("stripeId", "==", customerId)
    .get();

  if (userSnapshot.empty) {
    console.error(`No user found with stripeId: ${customerId}`);
    return;
  }

  const userDoc = userSnapshot.docs[0];
  const userId = userDoc.id;
  const userData = userDoc.data();

  // Sum the new generation limit to the current limit
  const newGenerationLimit =
    userData.generationLimit === Infinity
      ? Infinity
      : userData.generationLimit + generationLimit;

  const userRef = db.collection("users").doc(userId);

  await userRef.set(
    {
      generationLimit: newGenerationLimit,
      maxGenerationLimit,
    },
    { merge: true }
  );
};

const handleCustomerCreatedSucceeded = async (customer: Stripe.Customer) => {
  const customerId = customer.id as string;

  const generationLimit = freeGenerationLimit;
  const maxGenerationLimit = freeGenerationLimit;

  // Fetch the user document using the stripeId
  const userSnapshot = await db
    .collection("users")
    .where("stripeId", "==", customerId)
    .get();

  if (userSnapshot.empty) {
    console.error(`No user found with stripeId: ${customerId}`);
    return;
  }

  const userDoc = userSnapshot.docs[0];
  const userId = userDoc.id;
  const userEmail = userDoc.data().email;

  const userRef = db.collection("users").doc(userId);

  await userRef.set(
    {
      generationLimit,
      maxGenerationLimit,
      isAdmin: false,
      userEmail,
    },
    { merge: true }
  );
};
