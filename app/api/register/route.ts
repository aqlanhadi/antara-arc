import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: any): Promise<NextResponse> {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: "success" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An error occured" }, { status: 500 })
    }
}