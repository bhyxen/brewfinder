"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Package, Download, Star } from "lucide-react";
import { PopularPackagesChart } from "@/components/PopularPackagesChart";
import { PackageAnalytics } from "@/types/homebrew";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Home() {
	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());

	const { data: formulaData, error: formulaError } = useSWR<
		PackageAnalytics,
		Error
	>(
		"https://formulae.brew.sh/api/analytics/install-on-request/30d.json",
		fetcher
	);

	const { data: caskData, error: caskError } = useSWR<PackageAnalytics, Error>(
		"https://formulae.brew.sh/api/analytics/cask-install/30d.json",
		fetcher
	);

	if (formulaError || caskError) {
		console.error("There has been an error loading analytics");
	}

	// Mock data for statistics
	const totalPackages =
		(caskData?.total_items || 0) + (formulaData?.total_items || 0);
	const totalDownloads =
		(caskData?.total_count || 0) + (formulaData?.total_count || 0);
	const averageStars = 45;

	const router = useRouter();

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const input = form.querySelector(
			'input[type="search"]'
		) as HTMLInputElement;
		router.push(`/packages/?search=${input.value}`);
	};

	return (
		<SessionProvider>
			<div className="space-y-12 grow flex flex-col justify-center">
				<section className="text-center space-y-6 min-h-96 flex flex-col justify-center items-center">
					<h1 className="text-4xl font-bold mb-4">Welcome to Brewfinder</h1>
					<p className="text-xl text-muted-foreground">
						Discover, save, and install Homebrew packages with ease
					</p>
					<div className="w-full max-w-2xl">
						<form
							className="flex items-center space-x-2"
							onSubmit={handleOnSubmit}
						>
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

				<section className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Homebrew Statistics</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Unique Package Installations (30 days)
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
									Total Package Installations (30 days)
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

				{caskData && formulaData && (
					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4">
							Popular Packages (Last 30 Days)
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Casks</CardTitle>
								</CardHeader>
								<CardContent>
									<PopularPackagesChart data={caskData.items.slice(0, 5)} />
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Formulas</CardTitle>
								</CardHeader>
								<CardContent>
									<PopularPackagesChart data={formulaData.items.slice(0, 5)} />
								</CardContent>
							</Card>
						</div>
					</section>
				)}
				<section className="text-center">
					<div className="flex justify-center space-x-4">
						<Button asChild>
							<Link href="/packages">View All Packages</Link>
						</Button>
					</div>
				</section>
			</div>
		</SessionProvider>
	);
}
