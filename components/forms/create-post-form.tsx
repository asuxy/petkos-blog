"use client"

import { createPost, State } from '../../lib/actions/blog-actions'
import { useActionState } from 'react';
import { Button } from '../ui/button';
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { postSchema } from '@/lib/zod-schemas';

type PostFormData = z.infer<typeof postSchema>

export default function CreatePostForm() {
    const form = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    })

    const initialState: State = { message: null, errors: {} };
    const [state, formAction, pending] = useActionState(createPost, initialState);

    return (
        <div>
            <Form {...form}>
                <form action={formAction} className="space-y-6">
                    {state?.message && (
                        <div className="p-3 rounded-md bg-red-100 text-red-700" aria-live="polite">
                            {state.message}
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your post title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea rows={10} placeholder="Write your post content here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={pending} aria-disabled={pending}>
                        {pending ? 'Creating...' : 'Create Post'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}