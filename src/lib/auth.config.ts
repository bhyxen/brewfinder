import GitHub, { GitHubProfile } from "next-auth/providers/github";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";

export const openRoutes = [
	"/",
	"/sign-in",
	"/packages",
	"/privacy",
	"/public-lists",
	"/terms",
];

// Notice this is only an object, not a full Auth.js instance
// Fixed edge runtime error by following the guide here:
// https://authjs.dev/guides/edge-compatibility
export default {
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID as string,
			clientSecret: process.env.AUTH_GITHUB_SECRET as string,
			profile: (profile: GitHubProfile) => {
				return {
					// Ensure the 'id' is returned to fix OAuthAccountNotLinked error
					// https://github.com/nextauthjs/next-auth/issues/9992#issuecomment-2585799270
					id: profile.id.toString(),
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
		Google({
			profile: (profile: GoogleProfile) => {
				return {
					// Ensure the 'id' (sub) is returned to fix OAuthAccountNotLinked error
					// https://github.com/nextauthjs/next-auth/issues/9992#issuecomment-2585799270
					id: profile.sub,
					firstName: profile.given_name,
					lastName: profile.family_name,
					email: profile.email,
					image: profile.picture,
					username:
						`${profile.given_name}${profile.family_name}`.toLowerCase() ??
						"unknown",
				};
			},
		}),
	],
} as NextAuthConfig;
