import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
 
export async function POST(request: Request) {
  const { email } = await request.json()

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) return NextResponse.json({ message: 'User does not exist' }, { status: 404 })

  return NextResponse.json({ message: 'User exists' }, { status: 200 })
}