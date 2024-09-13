import React from "react";
import Link from "next/link";

const AdBlockDetected: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Ad Blocker Detected
        </h1>
        <p className="mb-4">
          Please disable your ad blocker to continue using this site.
        </p>
        <Link href="/app" className="px-4 py-2 bg-blue-500 text-white rounded">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AdBlockDetected;
