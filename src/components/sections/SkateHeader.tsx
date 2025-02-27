import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import SocialIcon from '../ui/SocialIcons';
import { Social } from '@/types/social';
import { Sponsor } from '@/types/sponsor';

interface SkateHeaderProps {
    skate: any;
    session: any;
}

export const SkateHeader = ({ skate, session }: SkateHeaderProps) => {
    return (
        <div className="">
            <header className="mt-4 mx-4 flex flex-row items-center gap-7">
                <div>
                    <Image
                        className="inline-block shrink-0 rounded-full w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
                        src={skate.photo || '/images/skateboard.png'}
                        width={400}
                        height={400}
                        alt="Skate image"
                    />
                </div>
                <section className='w-full max-w-sm flex flex-row gap-4 justify-between'>
                    <div>
                        <h2>{skate?.nickname}</h2>
                        <p>{skate?.preferredSkateStyle}</p>
                    </div>
                    <div>
                        <p>{skate?.level}</p>
                        {skate?.sponsors.length > 0 ?
                            skate?.sponsors.map((spon: Sponsor) => {
                                return (
                                    <p>{spon.name}</p>
                                );
                            })
                            : null}

                    </div>
                </section>
            </header>

            {/* Social Networks */}
            <div className="flex flex-wrap justify-between mt-4">
                <div className="flex flex-wrap items-center px-4">
                    {skate?.socials.map((social: Social) => {
                        return (
                            <Link key={social.id} href={social.url || ""} target="_blank" rel="noopener noreferrer" className="mr-4">
                                <SocialIcon platform={social.platform} className="w-6 h-6 text-blue-500" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
