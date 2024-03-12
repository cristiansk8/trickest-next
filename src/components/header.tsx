"use client"
import Appbar from "./Appbar";
import Providers from "./Providers";
import Link from "next/link";
import MotionTransition from "./transition-component";
import { socialNetworks } from "../../data";


const Header = () => {
    return (
        <MotionTransition position="bottom" className="absolute z-40 inline-block w-full top-5 md:top-10">
            <header>
            <Providers>
          <Appbar />
        </Providers>
                <div className="container justify-between max-w-6xl mx-auto md:flex">
                    <Link href='/' >
                            <h1 className="my-3 text-4xl font-bold text-center md:text-left text-budGreen flex items-center">
                                Watermelon 
                                <span className="text-watermelon text-5xl ml-2"> Code</span>
                            </h1>
                    </Link>
                    <div className="flex items-center justify-center gap-7">
                        {socialNetworks.map(({ logo, src, id }) => (
                            <Link
                                key={id}
                                href={src}
                                target="_blank"
                                className="transition-all duration-300 hover:text-watermelon"
                            >
                                {logo}
                            </Link>
                        ))}
                    </div>
                </div>
                
            </header>
        </MotionTransition>
    );
}

export default Header;