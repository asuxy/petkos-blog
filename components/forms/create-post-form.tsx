"use client"

import React from 'react';
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
    FormDescription,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { postSchema } from '@/lib/zod-schemas';
import { MultiSelect } from '../multi-select';

type PostFormData = z.infer<typeof postSchema>

interface CreatePostFormProps {
    categories: { label: string; value: string }[]
}

export default function CreatePostForm({ categories }: CreatePostFormProps) {
    const form = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            content: '',
            excerpt: '',
            categories: [],
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
                        name="categories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categories</FormLabel>
                                <FormControl>
                                    <MultiSelect
                                        options={categories}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        placeholder="Select options"
                                        variant="inverted"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Choose related to content categories.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your a short description, no more than 100 symbols" {...field} />
                                </FormControl>
                            </FormItem>}>
                    </FormField>

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