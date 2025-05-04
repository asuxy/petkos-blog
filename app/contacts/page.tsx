'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { useActionState } from 'react'
import { handleContactForm } from '@/lib/actions/contact-actions'
import { contactSchema } from "@/lib/zod"

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactsPage() {
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: '',
            message: '',
        },
    })

    const [state, formAction, pending] = useActionState(handleContactForm, null)

    return (
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 py-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div>
                <h1 className="text-2xl font-semibold mb-4">Send us a message</h1>
                <Form {...form}>
                    <form action={formAction}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="How can we help you?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Sending...' : 'Send Message'}
                        </Button>
                        {state?.success && <p className="text-sm text-green-600">Message sent successfully!</p>}
                        {state?.error && (
                            <p className="text-sm text-red-600">{state.error}</p>
                        )}
                    </form>
                </Form>
            </div>

            {/* Static Info */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p className="text-muted-foreground">We're available weekdays 9am–6pm</p>
                <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">contact@yourdomain.com</p>
                </div>
                <div>
                    <p className="font-medium">Socials</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
                <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">123 Developer Lane<br />Code City, JS 10101</p>
                </div>
            </div>
        </div>
    )
}