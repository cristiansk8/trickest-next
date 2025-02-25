import Image from "next/image";
import localFont from 'next/font/local';
import Link from "next/link";
import StartButtons from "./layout/StartButtons";
import VideoModalManager from "./ui/VideoModalManager";

const myFont = localFont({
    src: './fonts/blox.woff',
    display: 'auto',
});

const GameIntro = () => {
    return (
        <div className="z-20 w-full grid items-center p-6 py-20 md:py-0 md:grid-cols-3 justify-center bg-[#2e2257] bg-[url('/png-big-city.png')] bg-cover bg-repeat bg-top">
            {/* Columna 1: Logo y texto */}
            <div className="flex flex-col w-full justify-center mx-auto">
                <div className="justify-between">
                    <Link href='/' className="text-center">
                        <Image
                            src="/logo.png"
                            priority
                            width={100}
                            height={450}
                            alt="Logo"
                            className="mx-auto pt--4"
                        />
                    </Link>
                </div>
                <p className={`mx-auto mb-2 text-4xl text-center md:text-6xl md:mx-0 md:mb-8 ${myFont.className}`}>
                    <span className="block md:flex">
                        patina graba postea
                    </span>
                    <span className="text-watermelon md:text-9xl">
                        gana
                    </span>
                </p>
            </div>

            {/* Columna 2: StartButtons y Arcade Image */}
            <div className="relative flex justify-center items-end w-full h-full">
                {/* Contenedor de la cuadrícula (mismo tamaño que la imagen) */}
                <div className="absolute top-0 w-full max-w-md md:max-w-none h-full grid grid-cols-5 grid-rows-7">
                    {/* Posición del VideoModalManager */}
                    <div className="col-span-5 row-start-3 grid grid-cols-subgrid">
                        <div className="col-start-2 col-span-3">
                            <div className="w-full flex items-center justify-center">
                                <VideoModalManager />
                            </div>
                        </div>
                    </div>

                    {/* Posición del StartButtons */}
                    <div className="col-span-5 row-start-6 grid grid-cols-subgrid">
                        <div className="col-start-4 col-span-1">
                            <StartButtons />
                        </div>
                    </div>
                </div>

                {/* Imagen de la arcade */}

                <Image
                    src="/arcade.png"
                    priority
                    width={200}
                    height={500}
                    alt="Arcade"
                    className="w-full max-w-md md:max-w-none"
                    style={{ height: "auto" }} // Asegura que la altura sea proporcional
                />
            </div>

            {/* Columna 3: Texto e imagen */}
            <div className="flex flex-col justify-center md:max-w-md mx-auto text-center">
                <h1 className="text-6xl text-center text-watermelon font-bold mb-5">
                    Gana un cupo para la gran final
                </h1>
                <Image
                    src="/trick-est.webp"
                    priority
                    width={250}
                    height={380}
                    alt="Trick"
                    className="mx-auto"
                />
            </div>
        </div>
    );
};

export default GameIntro;