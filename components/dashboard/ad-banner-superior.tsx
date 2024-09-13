import React, { useEffect } from "react";
import { Card } from "@radix-ui/themes";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface BannerProps {
  className: string;
  zoneId: string;
  isPopup: boolean;
}

const AddBannerSuperior: React.FC<BannerProps> = ({
  className,
  zoneId,
  isPopup,
}) => {
  useEffect(() => {
    // Crear y agregar el primer script
    const adScript = document.createElement("script");
    adScript.async = true;
    adScript.type = "application/javascript";
    adScript.src = "https://a.magsrv.com/ad-provider.js";
    document.body.appendChild(adScript);

    // Crear y agregar el elemento ins
    const adIns = document.createElement("ins");
    adIns.className = className;
    adIns.setAttribute("data-zoneid", zoneId);
    document.getElementById(`ad-container-${zoneId}`)?.appendChild(adIns);

    // Crear y agregar el segundo script
    const adScriptInline = document.createElement("script");
    adScriptInline.innerHTML =
      '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    document
      .getElementById(`ad-container-${zoneId}`)
      ?.appendChild(adScriptInline);

    // Función de limpieza para eliminar los scripts cuando el componente se desmonte
    return () => {
      try {
        document.body.removeChild(adScript);
        document.getElementById(`ad-container-${zoneId}`)?.removeChild(adIns);
        document
          .getElementById(`ad-container-${zoneId}`)
          ?.removeChild(adScriptInline);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  if (isPopup) {
    return <div id={`ad-container-${zoneId}`}></div>;
  } else {
    return (
      <Card>
        <CardContent className="text-center">
          <div id={`ad-container-${zoneId}`}></div>
        </CardContent>
      </Card>
    );
  }
};

export default AddBannerSuperior;
