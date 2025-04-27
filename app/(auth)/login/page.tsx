import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
import { Button } from "@/components/ui/button"

const SIGNIN_ERROR_URL = "/error"

export default async function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
    return (
        <div className="flex flex-col items-center justify-center">
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                    <input
                        name="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </label>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                    <input
                        name="password"
                        id="password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white" />
                </label>
                <Button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
                    Login
                </Button>
            </form>

            <br />

            {Object.values(providerMap).map((provider) => (
                <form key={provider.id} className="space-y-4 w-full max-w-sm"
                    action={async () => {
                        "use server"
                        try {
                            await signIn(provider.id, {
                                redirectTo: props.searchParams?.callbackUrl ?? "",
                            })
                        } catch (error) {
                            if (error instanceof AuthError) {
                                return redirect(`${SIGNIN_ERROR_URL}?error=${error}`)
                            }

                            throw error
                        }
                    }}
                >
                    <Button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
                        <span>Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}
        </div>
    )
}