"use client"

import React from 'react';
import { updatePost, State } from '../../lib/actions/blog-actions'
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Post } from '@prisma/client'
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

interface EditPostFormProps {
    post: Pick<Post, 'id' | 'title' | 'content'>; // Get only needed fields
}

type PostFormData = z.infer<typeof postSchema>

export default function EditPostForm({ post }: EditPostFormProps) {
    const form = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post.title,
            content: post.content ?? '',
        },
    });

    const initialState: State = { message: null, errors: {} };
    const updatePostWithId = updatePost.bind(null, post.id);
    const [state, formAction, pending] = useActionState(updatePostWithId, initialState);

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
                                    <Input
                                        placeholder="Enter your post title"
                                        {...field}
                                    />
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
                                    <Textarea
                                        rows={10}
                                        placeholder="Write your post content here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={pending}
                        aria-disabled={pending}>
                        {pending ? 'Updating...' : 'Update Post'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}