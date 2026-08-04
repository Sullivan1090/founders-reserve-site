import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { type Metadata, type Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { PwaRegister } from "@/components/pwa-register";
import { OneSignalInit } from "@/components/onesignal-init";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const viewport: Viewport = {
  themeColor: "#1B3448",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Founders Reserve",
  description: "A members-only experience for Sullivan Rutherford Estate wine club members.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Founders Reserve",
    startupImage: [
      // iPhone 14 Pro Max
      { url: "/icons/apple-touch-icon.png", media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)" },
      // iPhone 14 / 13 / 12
      { url: "/icons/apple-touch-icon.png", media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" },
    ],
  },
  icons: {
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
      { url: "/icons/icon-167.png",          sizes: "167x167" },
      { url: "/icons/icon-152.png",          sizes: "152x152" },
    ],
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  other: {
    // Android / Chrome
    "mobile-web-app-capable": "yes",
    // Microsoft Tiles (Edge mobile)
    "msapplication-TileColor": "#1B3448",
    "msapplication-TileImage": "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="font-serif antialiased bg-background text-foreground min-h-[100dvh] flex flex-col">
        {children}
        <Toaster />
        <PwaRegister />
        <OneSignalInit />
      </body>
    </html>
  );
}
