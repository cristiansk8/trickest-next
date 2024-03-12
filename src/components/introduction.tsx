'use client'
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';

const Introduction = () => {
    return (
        <div className="z-20 w-full grid items-center h-full p-6 py-20 md:py-0 md:grid-cols-2 justify-center">
                <div className="flex justify-center md:justify-end">
                 <Image src="/home-4.png" priority width="500" height="450" alt="Avatar" className="md:ml-96"/>
                </div>
                <div className="flex flex-col justify-center md:max-w-md">
                    <h1 className="mb-5 text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-10">Si puedes pensarlo, <br />
                        <TypeAnimation
                            sequence={[
                                'puedes programarlo',
                                2000,
                                'puedes optimizarlo',
                                2000,
                                'puedes implementarlo',
                                2000,
                                'puedes desarrollarlo',
                                2000
                            ]}
                            wrapper="span"
                            speed={20}
                            repeat={Infinity}
                            className="font-bold text-budGreen"
                        />
                    </h1>
                    <p className="mx-auto mb-2 text-xl md:text-xl md:mx-0 md:mb-8">
                        <span className="text-watermelon">
                            Watermelon-Code:
                        </span>
                        Tu socio en desarrollo y diseño web. Con sede en Bogotá, nos especializamos en combinar diseño y funcionalidad para ofrecerte experiencias digitales innovadoras y accesibles
                    </p>
                    <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
                        <a href="/portfolio" 
                            className="px-3 py-2 my-2 transition-all border-2 cursor-pointer text-md w-fit text-watermelon border-watermelon rounded-xl hover:shadow-xl hover:shadow-white/50">
                            Ver proyectos
                        </a>
                        <a href="/contact"
                            className="px-3 py-2 my-5 transition-all border-2 cursor-pointer text-md w-fit text-budGreen border-budGreen rounded-xl hover:shadow-lg hover:shadow-budGreen" >
                            Contactanos
                        </a>
                    </div>
                </div>            
        </div>
    );
}

export default Introduction;