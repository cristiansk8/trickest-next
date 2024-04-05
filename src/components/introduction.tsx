'use client'
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import localFont from 'next/font/local';

const myFont = localFont({
    src: './fonts/blox.woff',
    display: 'auto'
});

const Introduction = () => {
    return (
        <div className="z-20 w-full grid items-center  p-6 py-20 md:py-0 grid-cols-2 md:grid-cols-3 justify-center bg-[#2e2257] bg-[url('/png-big-city.png')] bg-cover bg-repeat bg-top    ">
            <div className="flex flex-col w-full justify-center md:max-w-md mx-auto">
                <p className={`mx-auto mb-2 text-xl
                text-center md:text-6xl md:mx-0 md:mb-8 ${myFont.className}`}>
                    <span className="hidden md:flex">
                        patina graba postea
                    </span>
                    <span className="text-watermelon md:text-9xl">
                        gana
                    </span>
                </p>               
                <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10 mx-auto">
                <a href="/contact"
                        className="px-3 py-2 my-5 transition-all border-2 cursor-pointer text-md w-fit text-budGreen border-budGreen rounded-xl hover:shadow-lg hover:shadow-budGreen" >
                        Juega
                    </a>
                </div>
            </div>
            <div className="flex order-first md:order-none col-span-2 md:col-span-1 w-full justify-center md:justify-end text-center ">
                <Image src="/arcade.png" priority width="200" height="500" alt="Avatar" className=" w-full" />
            </div>
            <div className="flex flex-col justify-center md:max-w-md  mx-auto text-center">
                <h1 className="text-6xl text-center text-watermelon font-bold mb-5">¿Tienes algo especial para mostrar?</h1>
                <Image src="/trick-est.webp" priority width="250" height="380" alt="Avatar" className="mx-auto" />               
                <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10 mx-auto">
                    <a href="/portfolio"
                        className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit text-watermelon border-watermelon rounded-xl hover:shadow-xl hover:shadow-white/50">
                        Registrate
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Introduction;