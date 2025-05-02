'use server'

import prisma from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function registerUser(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = SignupFormSchema.safeParse({
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

    const existingUser = await prisma.user.findUnique({ where: { email: email } })
    if (existingUser) {
        return {
            message: 'Email already registered',
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    redirect('/login');
}