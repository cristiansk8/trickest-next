import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Header from "@/components/header";


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Thetrickest",
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
          <Navbar />
          {children}
        </body>
    </html>
  );
}
