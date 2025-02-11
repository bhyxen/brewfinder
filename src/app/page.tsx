"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Package, Download, Star } from "lucide-react";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Separator } from "@/components/ui/separator";

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

	// Mock data for statistics
	const totalPackages = 12500;
	const totalDownloads = 1000000;
	const averageStars = 45;

	// Mock data for popular categories
	const popularCategories = [
		{ name: "Development", count: 3000 },
		{ name: "Utilities", count: 2500 },
		{ name: "Networking", count: 2000 },
		{ name: "Multimedia", count: 1500 },
		{ name: "System", count: 1000 },
	];

	const chartConfig = {
		popularity: {
			label: "Popularity",
			icon: Star,
			theme: {
				light: "hsl(var(--chart-1))",
				dark: "hsl(var(--chart-1))",
			},
		},
	} satisfies ChartConfig;

	return (
		<div className="space-y-12 grow flex flex-col justify-center">
			<section className="text-center space-y-6 min-h-96 flex flex-col justify-center items-center">
				<h1 className="text-4xl font-bold mb-4">Welcome to Brewfinder</h1>
				<p className="text-xl text-muted-foreground">
					Discover, save, and install Homebrew packages with ease
				</p>
				<div className="w-full max-w-2xl">
					<form className="flex items-center space-x-2">
						<Input
							type="search"
							placeholder="Search for Homebrew packages..."
							className="text-lg py-6 bg-card"
						/>
						<Button type="submit" size="lg" className="cursor-pointer">
							<Search className="mr-2 h-5 w-5" />
							Search
						</Button>
					</form>
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

			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Homebrew Statistics</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Packages
							</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{totalPackages.toLocaleString()}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Downloads
							</CardTitle>
							<Download className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{totalDownloads.toLocaleString()}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Average Stars
							</CardTitle>
							<Star className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{averageStars}</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
				<Card>
					<CardContent className="pt-6">
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={popularCategories}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="name"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
								/>
								<YAxis />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar
									dataKey="count"
									fill="var(--color-popularity)"
									radius={4}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</section>

			<section className="text-center">
				<div className="flex justify-center space-x-4">
					<Button asChild>
						<Link href="/packages">View All Packages</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
