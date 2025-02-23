import React from 'react';
import HighScore from '@/components/sections/HighScore';

interface SkateExtraProps {
    skate: any;
}

export const SkateExtra = ({ skate }: SkateExtraProps) => {
    return (
        <>
            <div className="flex flex-col gap-5">
                <h4 className="text-lg text-lime-500">Equipamiento</h4>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    <div className="flex flex-col text-left">
                        <p className="text-xl">Madero</p>
                        <span>{skate.WishSkate?.madero}</span>
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-xl">Trucks</p>
                        <span>{skate.WishSkate?.trucks}</span>
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-xl">Ruedas</p>
                        <span>{skate.WishSkate?.ruedas}</span>
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-xl">Rodamientos</p>
                        <span>{skate.WishSkate?.rodamientos}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-between mt-4">
                <div className="flex flex-wrap items-center">
                    {skate.socials[0].facebook && (
                        <a
                            href={skate.socials[0].facebook}
                            className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                        >
                            Facebook
                        </a>
                    )}
                    {skate.socials[0].twitter && (
                        <a
                            href={skate.socials[0].twitter}
                            className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                        >
                            Twitter
                        </a>
                    )}
                    {skate.socials[0].instagram && (
                        <a
                            href={skate.socials[0].instagram}
                            className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                        >
                            Instagram
                        </a>
                    )}
                    {skate.socials[0].tiktok && (
                        <a
                            href={skate.socials[0].tiktok}
                            className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                        >
                            TikTok
                        </a>
                    )}
                    {skate.socials[0].youtube && (
                        <a
                            href={skate.socials[0].youtube}
                            className="flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"
                        >
                            YouTube
                        </a>
                    )}
                </div>
            </div>

            <ul className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments mt-4">
                <li className="flex mt-2 -mb-[2px]">
                    <a
                        aria-controls="summary"
                        className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary"
                        href="#"
                    >
                        Trucos
                    </a>
                </li>
                <li className="flex mt-2 -mb-[2px]">
                    <a
                        aria-controls="assignments"
                        className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-assignments]:border-primary group-[.active-assignments]:text-primary text-muted hover:border-primary"
                        href="#"
                    >
                        Logros
                    </a>
                </li>
            </ul>
            <div className="pt-28 text-center">
                <h1 className="text-slate-200 my-2 text-2xl md:text-4xl font-bold">Mis trucos</h1>
                <HighScore />
            </div>
        </>
    );
}
