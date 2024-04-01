"use client"
import Image from "next/image";
import Appbar from "./Appbar";
import Providers from "./Providers";
import Registro from '@/components/registro'
import Link from "next/link";
import MotionTransition from "./transition-component";


const Header = () => {
    return (
        <MotionTransition position="bottom" className="absolute z-40 inline-block w-full top-5 md:top-10">
            <header>
{/*                 <Providers>
                    <Appbar />
                </Providers> */}
                <div className="justify-between">
                    <Link href='/' className="text-center">
                        <Image src="/logo.png" priority width="100" height="450" alt="Avatar" className="mx-auto pt--4" />
                    </Link>
                </div>

            </header>
        </MotionTransition>
    );
}

export default Header;