import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AppFrame } from "@/components/layout/app-frame";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "TregoIndia Clothing",
  description: "Fast, mobile-first clothing storefront with a separate admin workspace."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
