'use client'
import Image from "next/image";
import styles from "./Partners.module.css"; // Importa tus estilos CSS

const profiles = [
    { name: "Cristian Parra", role: "Founder CEO", imageSrc: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar1.png" },
    { name: "Alejando 1312", role: "Comunicadora social", imageSrc: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar3.png" },
    { name: "Pepito", role: "BackEnd Develop", imageSrc: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar2.png" },
    { name: "Jhonatan Vargas", role: "UI/UX Designer", imageSrc: "https://tailone.tailwindtemplate.net/src/img/dummy/avatar4.png" }
];

const Partners = () => {
    return (
        <div>
            <div id="team" className={`section relative pt-20 pb-8 md:pt-16 bg-white dark:bg-gray-800 ${styles.container}`}>
                <div className={`container xl:max-w-6xl mx-auto px-4 ${styles.teamContainer}`}>
                    <header className="text-center mx-auto mb-12">
                        <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
                            <span className="font-light">Nuestros</span> Socios
                        </h2>
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 100 60"
                            className={`mx-auto h-10 ${styles.svg}`}
                        >
                            <circle cx="50.1" cy="30.4" r="5" className="stroke-primary" />
                            <line x1="55.1" y1="30.4" x2="100" y2="30.4" className="stroke-primary" />
                            <line x1="45.1" y1="30.4" x2="0" y2="30.4" className="stroke-primary" />
                        </svg>
                    </header>

                    <div className={`flex flex-wrap flex-row -mx-4 justify-center ${styles.team}`}>
                        <div className={`flex flex-wrap flex-row -mx-4 justify-center ${styles.team}`}>
                            {profiles.map((profile, index) => (
                                <div key={index} className={`flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6 ${styles.profile}`}>
                                    <div className={`relative overflow-hidden bg-white dark:bg-gray-800 mb-12 hover-grayscale-0 wow fadeInUp ${styles.profileContainer}`}>
                                        <div className={`relative overflow-hidden px-6 ${styles.imageContainer}`}>
                                            <Image width={80} height={80} src={profile.imageSrc} className="max-w-full h-auto mx-auto rounded-full bg-gray-50 grayscale" alt="title image" />
                                        </div>
                                        <div className="pt-6 text-center">
                                            <p className="text-black text-lg leading-normal font-bold mb-1">{profile.name}</p>
                                            <p className="text-gray-500 leading-relaxed font-light">{profile.role}</p>
                                            {/* Aquí van los enlaces de redes sociales */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
