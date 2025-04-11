"use client"

import { createPost, State } from '../../lib/actions/blogActions'
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { useFormStatus } from "react-dom";

export default function CreatePostForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createPost, initialState);
    const { pending } = useFormStatus();

    return (
        <form action={formAction} className="space-y-6">
            {state?.message && (
                <div className="p-3 rounded-md bg-red-100 text-red-700" aria-live="polite">
                    {state.message}
                </div>
            )}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    aria-describedby="title-error"
                    placeholder="Enter your post title"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title?.map((error: string) => (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    aria-describedby='content-error'
                    placeholder="Write your post content here..."
                    rows={10}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                />
                <div id="content-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.content?.map((error: string) => (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400" key={error}>
                            {error}
                        </p>
                    ))}
                </div>
            </div>
            <Button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={pending}
                aria-disabled={pending}>
                {pending ? 'Creating...' : 'Create Post'}
            </Button>
        </form>
    )
}