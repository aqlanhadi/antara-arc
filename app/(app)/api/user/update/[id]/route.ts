import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
 
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { username } = await request.json()

    // update username where email matches
    const user = await prisma.user.update({
        where: {
            id: params.id,
        },
        data: {
            username,
        },
    })

    return NextResponse.json(user, { status: 200 })
}