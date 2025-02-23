import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Providers } from "./providers";
import Header from "@/components/layout/Header";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "The-trickest",
  description: "patina, graba y postea",
  keywords: 'desarrollo web, diseño web, paginas web, aplicaciones web, desarrollo web bogota, diseño web bogota, paginas web bogota, aplicaciones web bogota, colombia',

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
