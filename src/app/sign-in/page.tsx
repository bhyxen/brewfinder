"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Beer } from "lucide-react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			// Simulated API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// If login is successful, redirect to home page
			router.push("/");
		} catch (err) {
			setError("Invalid email or password");
		}
	};

	return (
		<div className="grow flex flex-col justify-center items-center">
			<Card className="w-full max-w-md shadow-xl">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center mb-2">
						<Beer className="h-12 w-12 text-primary" />
					</div>
					<CardTitle className="text-3xl font-bold text-center">
						Sign in to Brewfinder
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-medium">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password" className="text-sm font-medium">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button type="submit" className="w-full">
							Sign In
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-2">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							href="/register"
							className="text-primary hover:underline font-medium"
						>
							Register here
						</Link>
					</p>
					<Link href="/" className="text-sm text-gray-600 hover:underline">
						Back to Home
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
