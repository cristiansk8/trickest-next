import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

  //await prisma.user.deleteMany(); // delete * from todo

  const user  = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      createdAt: new Date('2024-05-01'),
    },
  })
  // Mejorar la respuesta del endpoint
  return NextResponse.json({ message: 'User created database populated' });
}