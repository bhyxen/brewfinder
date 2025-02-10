import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Home() {
	// This would typically come from an API call
	const popularPackages = [
		{ name: "wget", description: "Internet file retriever" },
		{ name: "git", description: "Distributed revision control system" },
		{
			name: "node",
			description: "Platform built on V8 to build network applications",
		},
		{
			name: "python",
			description:
				"Interpreted, interactive, object-oriented programming language",
		},
	];

	return (
		<div className="space-y-12">
			<section className="text-center space-y-6">
				<h1 className="text-4xl font-bold mb-4">Welcome to Brewfinder</h1>
				<p className="text-xl text-muted-foreground">
					Discover, save, and install Homebrew packages with ease
				</p>
				<div className="max-w-2xl mx-auto">
					<form className="flex items-center space-x-2">
						<Input
							type="search"
							placeholder="Search for Homebrew packages..."
							className="text-lg py-6 bg-card"
						/>
						<Button type="submit" size="lg">
							<Search className="mr-2 h-5 w-5" />
							Search
						</Button>
					</form>
				</div>
				<div className="flex justify-center space-x-4">
					<Button asChild variant="outline">
						<Link href="/my-lists">My Lists</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/public-lists">Public Lists</Link>
					</Button>
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">Popular Packages</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{popularPackages.map((pkg) => (
						<Card key={pkg.name}>
							<CardHeader>
								<CardTitle>{pkg.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>{pkg.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
