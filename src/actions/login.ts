"use server";

import { signIn, signOut, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { EMAIL_PROVIDER_ID } from "@/lib/constants";

const SIGNIN_ERROR_URL = "/";

type Provider = {
	id: string;
	name: string;
};

export const login = async (
	provider: Provider,
	callbackUrl?: string,
	...args: any[]
) => {
	try {
		await signIn(provider.id, {
			redirectTo: callbackUrl ?? "",
		});
	} catch (error) {
		// Signin can fail for a number of reasons, such as the user
		// not existing, or the user not having the correct role.
		// In some cases, you may want to redirect to a custom error
		if (error instanceof AuthError) {
			return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
		}

		// Otherwise if a redirects happens Next.js can handle it
		// so you can just re-thrown the error and let Next.js handle it.
		// Docs:
		// https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
		throw error;
	}
};

export const loginWithEmail = async (formData: FormData) => {
	"use server";
	try {
		await signIn(EMAIL_PROVIDER_ID, formData);
	} catch (error) {
		if (error instanceof AuthError) {
			return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
		}
		throw error;
	}
};

export const logout = async () => {
	"use server";
	await signOut();
};
