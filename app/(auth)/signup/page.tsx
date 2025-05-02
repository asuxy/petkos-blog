'use client'

import { registerUser, State } from "@/lib/actions/user-actions"
import { useActionState } from "react"
import { Button } from "@/components/ui/button";

export default function SignupPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction, pending] = useActionState(registerUser, initialState)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form action={formAction} className="space-y-4 w-full max-w-sm">
                {state?.message && (
                    <div className="p-3 rounded-md bg-red-100 text-red-700" aria-live="polite">
                        {state.message}
                    </div>
                )}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="name"
                        aria-describedby="name-error"
                        placeholder="Name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400" >{state.errors.name}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        aria-describedby="email-error"
                        placeholder="Yours@email.com"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{state.errors.email}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        aria-describedby="password-error"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {state?.errors?.password && (
                            <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                                <p>Password must:</p>
                                <ul>
                                    {state.errors.password.map((error) => (
                                        <li key={error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Your Password
                </label>
                <input
                    type="password"
                    name="confirm-password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <Button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded"
                    disabled={pending}
                    aria-disabled={pending}>
                    {pending ? 'Creating...' : 'Register'}
                </Button>
            </form>
        </div>
    )
}