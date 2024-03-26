'use client'
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import localFont from 'next/font/local';

const myFont = localFont({
    src: './fonts/blox.woff',
    display:'auto'
  });

const Introduction = () => {
    return (
        <div className="z-20 w-full grid items-center h-full p-6 py-20 md:py-0 md:grid-cols-3 justify-center">
                <div className="flex flex-col justify-center md:max-w-md">
                 <p className={`mx-auto mb-2 text-xl md:text-xl md:mx-0 md:mb-8 ${myFont.className}`}>
                        <span className="text-watermelon">
                            Skaters,  
                        </span>
                        Explora la plataforma, donde el skate cobra vida
                 </p>
                 <p>
                 demuestra tus habilidades, compite y sobresale
                 </p>
                 <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
                        <a href="/portfolio" 
                            className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit text-watermelon border-watermelon rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Registrate
                        </a>
                    </div>
                </div>  

                <div className="flex justify-center md:justify-end text-center">
                 <Image src="/arcade.png" priority width="500" height="450" alt="Avatar" className="md:ml-96"/>
                </div>
                <div className="flex flex-col justify-center md:max-w-md">
                    <h1 className="mb-5 text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-10">Trickest game, <br />
                        <TypeAnimation
                            sequence={[
                                'Patina',
                                2000,
                                'Graba',
                                2000,
                                'Postea',
                                2000,
                                'Gana!',
                                2000
                            ]}
                            wrapper="span"
                            speed={20}
                            repeat={Infinity}
                            className="font-bold text-budGreen"
                        />
                    </h1>
                    <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
                        <a href="/contact"
                            className="px-3 py-2 my-5 transition-all border-2 cursor-pointer text-md w-fit text-budGreen border-budGreen rounded-xl hover:shadow-lg hover:shadow-budGreen" >
                            Juega
                        </a>
                    </div>
                </div>            
        </div>
    );
}

export default Introduction;