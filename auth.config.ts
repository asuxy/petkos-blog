import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { signInSchema } from "@/lib/zod-schemas"
import { ZodError } from "zod"
import { authUser } from "./lib/actions/user-actions"

const config = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await authUser(email, password);

          return user;
        } catch (error) {
          if (error instanceof ZodError) return null
          console.error("Authorize error:", error)
          return null
        }
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig

export default config