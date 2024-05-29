import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER"
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

import { JWT } from "next-auth/jwt"
declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER"
    }
}

export const {
    auth, signIn, signOut, handlers
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    callbacks: {
        async session({token, session, user}){
            if(!token.sub || !token) return session;
            session.user.id = token.sub;
            if(session.user){
                if(session.user.email === "admin@cdd.edu.ph"){
                    session.user.role = "ADMIN"
                }
            }
            return session;
        },
        async jwt({token}){
            return token;
        },
    }
});