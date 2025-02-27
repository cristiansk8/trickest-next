'use server'

import prisma from '@/lib/prisma';

export const checkUserRegistration = async (email: string) => {

  try {
    if (!email) {
      throw new Error('Email requerido');
    }   

    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    return { registered: !!user };
  } catch (error) {
    console.error('Error verificando usuario:', error);
    throw new Error('Error en el servidor');
  }
};