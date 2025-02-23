import React from 'react'

import { getServerSession } from 'next-auth';

import { notFound } from 'next/navigation';
import { getSkateByNickenName } from '@/actions';

import { authOptions } from '@/app/lib/auth';
import { SkateHeader } from '@/components/sections/SkateHeader';
import { SkateExtra } from '@/components/sections/SkateExtra';
import { HiddenSkateExtra } from '@/components/sections/HiddenSkateExtra';


export default async function SkateByNickenName({ params }: {
    params: Promise<{ nickname: string }>
}) {
    // Obtener la información del skateboard por el nombre de usuario
    const { nickname } = await params;

    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    console.log('Session: server', session);


    const skate = await getSkateByNickenName(nickname);

    if (!skate) {
        notFound();
    }

    return (
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable pt-20">
            <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
                <SkateHeader skate={skate} session={session} />
                {
                    session ?
                        <SkateExtra skate={skate} />
                        :
                        <HiddenSkateExtra />
                }
            </div>
        </div>
    );
}

