"use server"

import { sendEmail } from '@/lib/email'
import { contactSchema } from '../zod'

export async function handleContactForm(prevState: any, formData: FormData) {
    const validated = contactSchema.safeParse({
        email: formData.get('email'),
        message: formData.get('message'),
    })

    if (!validated.success) {
        return { error: 'Invalid form data' }
    }

    try {
        await sendEmail(validated.data)
        return { success: true }
    } catch (err) {
        console.error(err)
        return { error: 'Failed to send email' }
    }
}