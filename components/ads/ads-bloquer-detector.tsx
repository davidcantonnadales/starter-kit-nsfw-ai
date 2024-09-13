"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdBlockDetectorProps {
  role?: string;
}

const AdBlockDetector: React.FC<AdBlockDetectorProps> = ({ role }) => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const detectAdBlock = () => {
      if (role) return;

      const adScript = document.createElement("script");
      adScript.async = true;
      adScript.type = "application/javascript";
      adScript.src = "https://a.magsrv.com/ad-provider.js";
      document.body.appendChild(adScript);

      const container = document.createElement("div");
      container.id = `ad-container-5368004`;
      document.body.appendChild(container);

      const adIns = document.createElement("ins");
      adIns.className = "eas6a97888e2";
      adIns.setAttribute("data-zoneid", "5368004");
      container.appendChild(adIns);

      const adScriptInline = document.createElement("script");
      adScriptInline.innerHTML =
        '(AdProvider = window.AdProvider || []).push({"serve": {}});';
      container.appendChild(adScriptInline);

      setTimeout(() => {
        var container = document.getElementById(`ad-container-5368004`);
        if (container?.childNodes?.length! < 3) {
          setAdBlockDetected(true);
        }
      }, 2000);
    };

    if (typeof window !== "undefined") {
      detectAdBlock();
    }

    return () => {
      // Cleanup HTML elements when role is true or on component unmount
      const adScript = document.querySelector(
        "script[src='https://a.magsrv.com/ad-provider.js']"
      );
      if (adScript) {
        document.body.removeChild(adScript);
      }
      const container = document.getElementById(`ad-container-5368004`);
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, [role]);

  useEffect(() => {
    if (adBlockDetected) {
      router.push("/app/adblock-detected");
    }
  }, [adBlockDetected, router]);

  return null;
};

export default AdBlockDetector;
