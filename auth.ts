import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import prisma from "./lib/prisma"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs"
import { ZodError } from "zod"

const providers: Provider[] = [
    Credentials({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            try {
                let user = null

                const { email, password } = await signInSchema.parseAsync(credentials)

                user = await prisma.user.findUnique({
                    where: { email: email },
                })

                if (!user || !user.password) {
                    throw new Error("No user found")
                }

                const isValid = await bcrypt.compare(password, user.password)

                if (!isValid) {
                    throw new Error("Invalid password")
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            } catch (error) {
                if (error instanceof ZodError) {
                    // Return `null` to indicate that the credentials are invalid
                    return null
                }

                console.error("Authorize error:", error)
                return null
            }
        },
    }),
    GitHub,
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    pages: {
        signIn: "/login",
    },
})