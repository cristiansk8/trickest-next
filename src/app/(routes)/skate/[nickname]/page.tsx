import React from 'react'
import HighScore from '@/components/sections/HighScore';
import { TbSkateboarding } from "react-icons/tb";
import Link from 'next/link';
import { EditIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getSkateByNickenName } from '@/actions';

interface Props {
    params: { nickname: string }
}

export default async function SkateByNickenName({ params }: Props) {

    const { nickname } = params;

    const skate = await getSkateByNickenName(nickname);

    if (!skate) {
        notFound();
    }

    return (
        <>
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable pt-20">
                <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
                    <div className="flex flex-wrap mb-6 xl:flex-nowrap">
                        <div className="mb-5 mr-5">
                            <div className="relative inline-block shrink-0 rounded-2xl">
                                <img className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                                    src={skate.photo || '/images/skateboard.png'}
                                    alt="image" />
                            </div>
                        </div>
                        <div className="grow">
                            <div className="flex flex-wrap items-start justify-between mb-2">
                                <div className="flex flex-col md:flex-row">
                                    <div className='flex flex-row items-center justify-between'>
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <h3
                                                    className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
                                                    {skate.name}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                                <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary">
                                                    <span className="mr-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                        </svg>
                                                    </span> {skate.ciudad}</p>
                                                <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary" href="#">
                                                    Score: <span className="mr-1">
                                                        27.000
                                                    </span>  </a>
                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full height-96 p-7'>
                                            <Link
                                                href="/dashboard/skaters/profile"
                                                className="text-primary font-bold text-2xl"
                                            >
                                                <EditIcon size={24} />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-5'>
                                        <h4 className='text-lg text-lime-500'>Equipamiento</h4>
                                        <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                                            <div className='flex flex-col text-left'>
                                                <p className='text-xl '>Madero</p>
                                                <span>{skate.WishSkate?.madero}</span>
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <p className='text-xl '>Trucks</p>
                                                <span>{skate.WishSkate?.trucks}</span>
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <p className='text-xl '>Ruedas</p>
                                                <span>{skate.WishSkate?.ruedas}</span>
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <p className='text-xl '>Rodamientos</p>
                                                <span>{skate.WishSkate?.rodamientos}</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="flex flex-wrap items-center">
                                    {
                                        !skate.socials[0].facebook ? null : (
                                            <a href={skate.socials[0].facebook} className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> Facebok </a>
                                        )
                                    }
                                    {
                                        !skate.socials[0].twitter ? null : (
                                            <a href={skate.socials[0].twitter} className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> Twitter </a>
                                        )
                                    }
                                    {
                                        !skate.socials[0].instagram ? null : (
                                            <a href={skate.socials[0].instagram} className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> Instagram </a>
                                        )
                                    }
                                    {
                                        !skate.socials[0].tiktok ? null : (
                                            <a href={skate.socials[0].tiktok} className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> TikTok </a>
                                        )
                                    }
                                    {
                                        !skate.socials[0].tiktok ? null : (
                                            <a href="#" className="flex items-center justify-center text-secondary-inverse rounded-full bg-black-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> YouTube </a>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <ul className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
                        <li className="flex mt-2 -mb-[2px]">
                            <a aria-controls="summary" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-summary]:border-primary group-[.active-summary]:text-primary text-muted hover:border-primary" href="#"> Trucos </a>
                        </li>
                        <li className="flex mt-2 -mb-[2px]">
                            <a aria-controls="assignments" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent group-[.active-assignments]:border-primary group-[.active-assignments]:text-primary text-muted hover:border-primary" href="#"> Logros </a>
                        </li>
                    </ul>
                    <div className='pt-28 text-center'>
                        <h1 className='text-slate-200 my-2 text-2xl md:text-4xl font-bold'>Mis trucos</h1>
                        <HighScore />
                    </div>
                </div>
            </div>
        </>
    )
}

