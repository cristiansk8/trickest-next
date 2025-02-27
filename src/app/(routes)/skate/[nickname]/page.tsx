import React from 'react'

import { getServerSession } from 'next-auth';

import { notFound } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { SkateHeader } from '@/components/sections/SkateHeader';
import { HiddenSkateExtra } from '@/components/sections/HiddenSkateExtra';
import { getSkateByNickenName } from '@/actions/skate/get-skate-by-nickname';
import WishSkate from '@/components/sections/WishSkate';


export default async function SkateByNickenName({ params }: {
    params: Promise<{ nickname: string }>
}) {
    // Obtener la información del skateboard por el nombre de usuario
    const { nickname } = await params;

    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);
    const skate = await getSkateByNickenName(nickname);

    if (!skate) {
        notFound();
    }

    return (
        <div className="">
            <SkateHeader skate={skate} session={session} />
            <WishSkate skate={skate} />
        </div>
    );
}

