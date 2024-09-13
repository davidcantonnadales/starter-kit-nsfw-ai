// firebaseAdmin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import admin from "firebase-admin";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const bucketName = "aixa-ai.appspot.com";

if (!serviceAccount) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set."
  );
}

const serviceAccountConfig = JSON.parse(serviceAccount);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccountConfig),
  });
}

const auth = getAuth();
const db = getFirestore();
const bucket = admin.storage().bucket(bucketName);

export { auth, db, bucket };
