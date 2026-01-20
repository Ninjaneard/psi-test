import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the default NextAuth types
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context.
     */
    interface Session {
        user: {
            role: string; // Add your custom properties here
            id: string; // Add other properties if needed
        } & DefaultSession["user"];
    }

    /**
     * The User model used by the Adapter.
     */
    interface User {
        role: string; // Add your custom properties here
        id: string; // Add other properties if needed
    }
}

// Extend the JWT type
declare module "next-auth/jwt" {
    /**
     * The JWT payload.
     */
    interface JWT {
        role: string; // Add your custom properties here
        id: string; // Add other properties if needed
    }
}