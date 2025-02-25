import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getConnectionDBClient } from "@/lib/db";
import Resend from "next-auth/providers/resend";
import type { Provider } from "next-auth/providers";
import { EMAIL_PROVIDER_ID } from "./constants";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's token ID. */
			id: string;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		id?: string;
	}
}

// Fix database adapter error by following the guide here:
// https://github.com/nextauthjs/next-auth/issues/10632#issuecomment-2254570131
const combinedProviders: Provider[] = [
	...authConfig.providers,
	Resend({
		from: process.env.RESEND_FROM,
		apiKey: process.env.AUTH_RESEND_KEY,
		id: EMAIL_PROVIDER_ID,
	}),
];

export const providerMap = combinedProviders
	.map((provider) => {
		if (typeof provider === "function") {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter(
		(provider) =>
			provider.id !== "credentials" && provider.id !== EMAIL_PROVIDER_ID
	);

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(getConnectionDBClient()),
	providers: combinedProviders,
	session: { strategy: "jwt" },
	pages: {
		signIn: "/sign-in",
	},
	debug: process.env.NODE_ENV === "development",
	callbacks: {
		jwt(data) {
			console.log({ dataJWT: data });
			if (data.user) {
				// User is available during sign-in
				data.token.id = data.user.id;
			}
			return data.token;
		},
		session(data) {
			console.log({ dataSession: data });
			data.session.user.id = data.token.id as string;
			return data.session;
		},
	},
});
