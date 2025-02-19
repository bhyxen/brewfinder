import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import Resend from "next-auth/providers/resend";

// Fix database adapter error by following the guide here:
// https://github.com/nextauthjs/next-auth/issues/10632#issuecomment-2254570131
const combinedProviders = [
	...authConfig.providers,
	Resend({
		from: process.env.RESEND_FROM,
	}),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(client),
	providers: combinedProviders,
	session: { strategy: "jwt" },
});
