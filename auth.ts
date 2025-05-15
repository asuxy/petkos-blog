import NextAuth from "next-auth"
import authConfig from "./auth.config"
import db from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add user data to token on login
            if (user) {
                token.id = user.id
                //token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            // Expose token data in the session
            if (session.user) {
                session.user.id = token.id as string
                //session.user.role = token.role as string
            }
            return session
        },
    },
})