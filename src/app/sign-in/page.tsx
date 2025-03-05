import type React from "react";

import { Beer, LogOut } from "lucide-react";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { auth, providerMap } from "@/lib/auth";
import { AuthErrors } from "@/lib/constants";
import { login, loginWithEmail, logout } from "@/actions/auth";
import Link from "next/link";

type PageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const providerIcons = {
	github: <SiGithub className="mr-2 h-4 w-4" />,
	google: <SiGoogle className="mr-2 h-4 w-4" />,
};

export default async function LoginPage(props: PageProps) {
	const { callbackUrl, error } = await props.searchParams;
	const session = await auth();

	return (
		<div className="container mx-auto flex flex-col items-center justify-center grow py-2">
			<div className="w-full max-w-md space-y-8">
				{!session ? (
					<>
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
								const loginAction = login.bind(
									null,
									provider,
									callbackUrl as string,
								);
								return (
									<form
										key={provider.id}
										action={loginAction}
									>
										<div className="mt-6">
											<Button
												variant="secondary"
												className="w-full text-md cursor-pointer"
											>
												{
													providerIcons[
														provider.id as keyof typeof providerIcons
													]
												}
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
								<span className="px-2 bg-background text-muted-foreground">
									Or
								</span>
							</div>
						</div>

						<form
							action={loginWithEmail}
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
										className="mt-1 bg-secondary"
									/>
								</div>
							</div>

							{error && (
								<Alert variant="destructive">
									<AlertDescription>
										{AuthErrors[
											error as keyof typeof AuthErrors
										] ?? AuthErrors["Default"]}
									</AlertDescription>
								</Alert>
							)}

							<Button
								type="submit"
								className="w-full text-md cursor-pointer"
							>
								Sign in
							</Button>
						</form>

						<p className="mt-10 text-center text-sm text-muted-foreground">
							There&#39;s no need to register, just sign in with
							your preferred method
						</p>
					</>
				) : (
					<div className="text-center">
						<Beer className="mx-auto h-12 w-12 text-primary" />
						<h2 className="mt-6 text-3xl font-bold">
							Welcome back to Brewfinder,{" "}
							{session.user.name ?? session.user.email}
						</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							You are already logged in, you can continue to use
							Brewfinder
						</p>
						<div className="flex justify-center flex-col items-center space-x-4 space-y-4 mt-6">
							<Button asChild>
								<Link href="/">Go to Home Page</Link>
							</Button>
							<span className="text-sm">Or</span>

							<form action={logout}>
								<Button
									variant="outline"
									type="submit"
									className="cursor-pointer"
								>
									<LogOut className="mr-2 h-4 w-4" />
									Sign in with a different account
								</Button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
