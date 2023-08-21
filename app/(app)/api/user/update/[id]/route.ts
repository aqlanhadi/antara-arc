import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
 
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { username, name, p_name } = await request.json()

    // update username where email matches
    try {
        const user = await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                username,
                name, 
                p_name
            },
        })
        return NextResponse.json(user, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}