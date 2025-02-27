import React from 'react';
import HighScore from '@/components/sections/HighScore';
import Image from 'next/image';

interface WishSkateProps {
    skate: any;
}

export default function WishSkate({ skate }: WishSkateProps) {
    console.log(skate?.wishSkate);
    return (
        <div className='p-4'>
            <div className="grid grid-cols-2 gap-5 md:flex-row">

                <div className='w-full h-full hidden md:block items-center bg-red-500'>
                    <Image
                        src={'/images/section-wishskate/img-skate.png'}
                        alt={skate.name}
                        width={800}
                        height={600}
                        className="w-full max-w-48 h-auto mx-auto"
                    />
                </div>
                <div className='flex flex-col justify-center w-full max-w-xs mx-auto'>
                    <h4 className="text-5xl text-orange-600 my-9">Equipment</h4>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col text-left gap-5">
                            <p className="text-4xl text-gray-50">Deck</p>
                            <span className='text-lg text-gray-400'>{skate.wishSkate?.deck}</span>
                        </div>
                        <div className="flex flex-col text-left gap-5">
                            <p className="text-4xl text-gray-50">Trucks</p>
                            <span className='text-lg text-gray-400'>{skate.wishSkate?.trucks}</span>
                        </div>
                        <div className="flex flex-col text-left gap-5">
                            <p className="text-4xl text-gray-50">Wheels</p>
                            <span className='text-lg text-gray-400'>{skate.wishSkate?.wheels}</span>
                        </div>
                        <div className="flex flex-col text-left gap-5">
                            <p className="text-4xl text-gray-50">Bearings</p>
                            <span className='text-lg text-gray-400'>{skate.wishSkate?.bearings}</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
