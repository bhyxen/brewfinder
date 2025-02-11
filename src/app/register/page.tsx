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

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			// Simulated API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// If registration is successful, redirect to sign-in page
			router.push("/sign-in");
		} catch (err) {
			setError("Failed to register. Please try again.");
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
						Create an account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your details to register for Brewfinder
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name" className="text-sm font-medium">
								Name
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full px-3 py-2 border rounded-md"
							/>
						</div>
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
						<div className="space-y-2">
							<Label htmlFor="confirmPassword" className="text-sm font-medium">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
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
							Register
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-2">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="text-primary hover:underline font-medium"
						>
							Sign in here
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
