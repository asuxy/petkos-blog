import React from 'react';
import { redirect } from "next/navigation"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { providerMap } from "@/lib/utils";

const SIGNIN_ERROR_URL = "/error"

export default async function SignInPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            {Object.values(providerMap).map((provider) => (
                <form key={provider.id} className="space-y-4 w-full max-w-sm"
                    action={async () => {
                        "use server"
                        try {
                            await signIn(provider.id);
                        } catch (error) {
                            if (error instanceof AuthError) {
                                return redirect(`${SIGNIN_ERROR_URL}?error=${error}`)
                            }

                            throw error
                        }
                    }}
                >
                    <Button variant="outline" type="submit" className="w-full p-2 text-sm">
                        <span>Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                    </span>
                </div>
            </div>

            {/* Email signIn */}
            <form className="space-y-4 w-full max-w-sm"
                action={async (formData) => {
                    "use server"
                    try {
                        await signIn("credentials", formData)
                    } catch (error) {
                        if (error instanceof AuthError) {
                            return redirect(`${SIGNIN_ERROR_URL}?error=${error}`)
                        }
                        throw error
                    }
                }}
            >
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                    <input
                        name="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 border" />
                </label>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                    <input
                        name="password"
                        id="password"
                        required
                        className="w-full px-4 py-2 border" />
                </label>
                <Button variant="outline" type="submit" className="w-full p-2 text-sm">
                    Sign in
                </Button>
            </form>

            <div className="text-center">
                <p>Don&apos;t have an account? </p>
                <Button asChild variant="link">
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
        </div>
    )
}