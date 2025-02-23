import React from 'react';
import Link from 'next/link';
import { EditIcon } from 'lucide-react';

interface SkateHeaderProps {
    skate: any;
    session: any;
}

export const SkateHeader = ({ skate, session }: SkateHeaderProps) => {
    return (
        <div className="flex flex-wrap mb-6 xl:flex-nowrap">
            <div className="mb-5 mr-5">
                <div className="relative inline-block shrink-0 rounded-2xl">
                    <img
                        className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                        src={skate.photo || '/images/skateboard.png'}
                        alt="Skate image"
                    />
                </div>
            </div>
            <div className="grow">
                <div className="flex flex-wrap items-start justify-between mb-2">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <div className="flex items-center mb-2">
                                    <h3 className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
                                        {skate.name}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                    <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                                        <span className="mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        {skate.ciudad}
                                    </p>
                                    <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary" href="#">
                                        Score: <span className="mr-1">27.000</span>
                                    </a>
                                </div>
                            </div>
                            {session &&
                                (
                                    <div className="w-full height-96 p-7">
                                        <Link href="/dashboard/skaters/profile" className="text-primary font-bold text-2xl">
                                            <EditIcon size={24} />
                                        </Link>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
