'use server'

import prisma from '@/app/lib/prisma';

type SkateSearchField = 'email' | 'nickname'

const getSkateByField = async (field: SkateSearchField, value: string) => {

    try {
        return await prisma.user.findFirst({
            where: { [field]: value },
            include: {
                socials: true,
                WishSkate: true,
            }
        })
    } catch (error) {
        console.error(`Error fetching skate by ${field}:`, error);
        throw new Error(`Failed to get skate by ${field}`);
    }
}

export const getSkateByEmail = async(email:string ) =>getSkateByField('email', email)
export const getSkateByNickname = async(nickname:string ) =>getSkateByField('nickname', nickname)