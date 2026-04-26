import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AppFrame } from "@/components/layout/app-frame";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

export const metadata = {
  title: "TregoIndia Clothing",
  description: "Fast, mobile-first clothing storefront with a separate admin workspace."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${font.variable} ${displayFont.variable}`}>
      <body>
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
