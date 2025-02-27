'use server'

import prisma from '@/lib/prisma';


export const getSkateByNickenName = async (nickname: string) => {
    try {
        const skate = await prisma.user.findFirst({
            include:{
                socials: true,
                wishSkate: true,
            },
            where: { nickname },
        });

        if (!skate) return null;

        return skate

    } catch (error) {
        throw new Error('Error getting skate by nickname');
    } 


}
