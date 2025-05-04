import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({ email, message, name }: { email: string, message: string, name?: string }) {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>', //TODO when site hosted (use real email)
        to: ['petkov.k.petko@gmail.com'],
        subject: message,
        html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    })
}