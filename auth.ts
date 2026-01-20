import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { Adapter } from "next-auth/adapters";
import {accounts, db, sessions, users, verificationTokens} from "@/app/data/schema.ts"
import Resend from "next-auth/providers/resend"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
}) as Adapter,
    providers: [Resend({
        from: "no-reply@srabct-test.org",

    })],
    callbacks: {
        async signIn({ user, account }) {
            console.log(user);
            console.log(account);
            if (account?.provider === "resend") {
                // If user is new or role needs updating
                // You might fetch user details to get their role from your DB
                // For example:
                // const dbUser = await db.user.findUnique({ where: { email: user.email } });
                // user.role = dbUser?.role || 'user';
                user.role = user.role || 'user'; // Assign default if not found
            }
            return true;
        },
    },
})