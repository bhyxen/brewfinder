import type React from "react";

import { redirect } from "next/navigation";
import Link from "next/link";
import { Beer } from "lucide-react";
import { SiGithub, SiMailgun } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { signIn, auth, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import { EMAIL_PROVIDER_ID } from "@/lib/constants";

const providerIcons = {
	github: <SiGithub className="mr-2 h-4 w-4" />,
	mailgun: <SiMailgun className="mr-2 h-4 w-4" />,
};

export default async function LoginPage(props: {
	searchParams: { callbackUrl: string | undefined };
}) {
	const { callbackUrl } = await props.searchParams;

	return (
		<div className="container mx-auto flex flex-col items-center justify-center grow py-2">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<Beer className="mx-auto h-12 w-12 text-primary" />
					<h2 className="mt-6 text-3xl font-bold">
						Welcome back to Brewfinder
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Please sign in with your preferred method
					</p>
				</div>

				<div>
					{Object.values(providerMap).map((provider) => {
						console.log({ provider });
						return (
							<form
								key={provider.id}
								action={async () => {
									"use server";
									try {
										await signIn(provider.id, {
											redirectTo: callbackUrl ?? "",
										});
									} catch (error) {
										console.log({ error });
										// Signin can fail for a number of reasons, such as the user
										// not existing, or the user not having the correct role.
										// In some cases, you may want to redirect to a custom error
										if (error instanceof AuthError) {
											console.log({ errorAuthError: error });
											return redirect(`/auth-error?error=${error?.type}`);
										}
										// Otherwise if a redirects happens Next.js can handle it
										// so you can just re-thrown the error and let Next.js handle it.
										// Docs:
										// https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
										throw error;
									}
								}}
							>
								<div className="mt-6">
									<Button
										variant="outline"
										className="w-full text-md cursor-pointer"
									>
										{providerIcons[provider.id as keyof typeof providerIcons]}
										Sign in with {provider.name}
									</Button>
								</div>
							</form>
						);
					})}
				</div>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<Separator className="w-full bg-muted-foreground" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-background text-muted-foreground">Or</span>
					</div>
				</div>

				<form
					action={async (formData) => {
						"use server";
						try {
							await signIn(EMAIL_PROVIDER_ID, formData);
						} catch (error) {
							if (error instanceof AuthError) {
								return redirect(`/auth-error?error=${error?.type}`);
							}
							throw error;
						}
					}}
					className="mt-8 space-y-6"
				>
					<div className="space-y-4 rounded-md shadow-sm">
						<div>
							<Label htmlFor="email" className="text-md">
								Email address
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								// value={email}
								// onChange={(e) => setEmail(e.target.value)}
								className="mt-1 bg-muted"
							/>
						</div>
					</div>

					{/* {error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)} */}

					<Button type="submit" className="w-full text-md cursor-pointer">
						Sign in
					</Button>
				</form>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					There's no need to register, just use your preferred method to sign in
				</p>
			</div>
		</div>
	);
}
