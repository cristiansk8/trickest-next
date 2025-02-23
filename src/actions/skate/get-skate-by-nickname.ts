'use server'

import prisma from '@/app/lib/prisma';


export const getSkateByNickenName = async (nickname: string) => {
    try {
        const skate = await prisma.user.findFirst({
            include:{
                socials: true,
                WishSkate: true,
            },
            where: { nickname },
        });

        if (!skate) return null;

        return skate

    } catch (error) {
        throw new Error('Error getting skate by nickname');
    } 


}
