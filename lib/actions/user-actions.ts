'use server'

import db from "@/lib/prisma"
import { signUpSchema } from "../zod-schemas"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"


export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function registerUser(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = signUpSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const confirmedPassword = formData.get('confirm-password');
    const { name, email, password } = validatedFields.data;

    if (confirmedPassword !== password) {
        return {
            message: 'Passwords are not equal',
        }
    }

    const existingUser = await db.user.findUnique({ where: { email: email } })
    if (existingUser) {
        return {
            message: 'Email already registered',
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    redirect('/login');
}

export async function authUser(email: string, password: string) {
    const user = await db.user.findUnique({
        where: { email },
    })

    if (!user || !user.password) {
        throw new Error("No user found")
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error("Invalid password")

    return {
        id: String(user.id),
        email: user.email,
        name: user.name,
        role: user.role,
    }
}