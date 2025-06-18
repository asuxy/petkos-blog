import * as z from 'zod'

export const signInSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const contactSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    message: z.string().min(10, { message: 'Message is too short' }),
})

export const signUpSchema = z.object({
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

export const postSchema = z.object({
    id: z.string(),
    title: z.string().trim().nonempty({
        message: 'Title is required'
    }),
    content: z.string().trim().nonempty({
        message: 'Content is required'
    }),
    excerpt: z.string().trim()
        .nonempty({ message: 'Excerpt is required' })
        .max(100, { message: 'Maximum allowed length is 100' }),
    categories: z
        .array(z.string())
        .min(1, { message: 'Please select at least one category' }),
});