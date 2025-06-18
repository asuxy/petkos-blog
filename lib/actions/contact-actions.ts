"use server"

import { sendEmail } from '@/lib/email'
import { contactSchema } from '../zod-schemas'

export type State = {
    errors?: {
        email?: string[];
        message?: string[];
    };
    message?: string | null;
    isSent?: boolean;
};

export async function handleContactForm(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = contactSchema.safeParse({
        email: formData.get('email'),
        message: formData.get('message'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to send email.',
            isSent: false,
        }
    }

    try {
        await sendEmail(validatedFields.data)
        return {
            message: 'Email sent successfully.',
            isSent: true,
        }
    } catch (err) {
        console.error(err)
        return {
            message: 'Database Error: Failed to send email.',
            isSent: false,
        }
    }
}