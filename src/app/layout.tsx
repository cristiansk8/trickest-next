import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Header from "@/components/header";


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Providers } from "./providers";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ' Watermelon Code - Desarrollo y Diseño Web en Bogotá',
  description: 'Watermelon Code es tu socio en desarrollo y diseño web con sede en Bogotá. Especializados en fusionar diseño y funcionalidad para crear experiencias digitales innovadoras y accesibles. ¡Contáctanos para ver nuestros proyectos!',
  keywords: 'desarrollo web, diseño web, paginas web, aplicaciones web, desarrollo web bogota, diseño web bogota, paginas web bogota, aplicaciones web bogota, colombia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Providers>
        <Header/>
        <Navbar/>  
        {children}
        </Providers>
      </body>
    </html>
  );
}
