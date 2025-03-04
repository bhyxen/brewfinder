import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getConnectionDBClient } from "@/lib/db";
import Resend from "next-auth/providers/resend";
import type { Provider } from "next-auth/providers";
import { EMAIL_PROVIDER_ID } from "./constants";

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

export const adapter = MongoDBAdapter(getConnectionDBClient());

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
			provider.id !== "credentials" && provider.id !== EMAIL_PROVIDER_ID,
	);

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter,
	providers: combinedProviders,
	session: { strategy: "jwt" },
	pages: {
		signIn: "/sign-in",
	},
	debug: process.env.NODE_ENV === "development",
	callbacks: {
		jwt(data) {
			if (data.user) {
				// User is available during sign-in
				data.token.id = data.user.id;
			}
			return data.token;
		},
		session(data) {
			data.session.user.id = data?.token?.id?.toString() as string;
			return data.session;
		},
	},
});
