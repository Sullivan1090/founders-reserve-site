import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Founder's Reserve",
  description: "A members-only experience for Sullivan Rutherford Estate wine club members.",
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
      </body>
    </html>
  );
}
