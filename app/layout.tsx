import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode, useEffect, useState } from "react";
import { RoleProvider } from "../components/auth/roleContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import AgeConfirmationPopup from "@/components/age/age-confirmation";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aixa.app"),
  title: "Aixa AI | Best AI Image Generator 2024",
  description:
    "Aixa AI is a top AI image generator platform, offering AI art creation, AI photo generation, and more. Generate stunning AI artwork, including NSFW content for adults, from just 3.99€ per month.",
  keywords: [
    "AI image generator",
    "AI art generator",
    "AI artwork",
    "text to image AI",
    "AI drawing generator",
    "AI art tool",
    "AI generated images",
    "AI creativity tool",
    "automated art creation",
    "AI NSFW content",
    "AI explicit content",
    "AI adult content",
    "Free AI image generator",
  ],
  applicationName: "Aixa AI",
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://www.aixa.app/assets/image/share-image.jpg",
        alt: "Aixa AI",
        width: 1000,
        height: 1000,
      },
    ],
    locale: "en_US",
    url: "https://www.aixa.app",
    title: "Aixa AI | Best AI Image Generator 2024",
    description:
      "Aixa AI is a top FREE AI image generator platform, offering AI art creation, AI photo generation, and more. Generate stunning AI artwork, including NSFW content for adults. Free and Unlimited.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="6a97888e-site-verification"
          content="6695423cf8ee807e0ea4f6ac7acfead6"
        ></meta>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={cn(font.className)}>
        <Theme
          accentColor="pink"
          panelBackground="solid"
          scaling="90%"
          appearance="dark"
        >
          <TooltipProvider>
            <MyFirebaseProvider>
              <RoleProvider>{children}</RoleProvider>
              <Toaster />
            </MyFirebaseProvider>
          </TooltipProvider>
        </Theme>
      </body>
    </html>
  );
}
