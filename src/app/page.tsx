"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import useSWR from "swr";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Package, Download, Star, ArrowUpRight } from "lucide-react";
import { PopularPackagesChart } from "@/components/PopularPackagesChart";
import { PackageAnalytics } from "@/types/homebrew";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Home() {
	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());

	const { data: formulaData, error: formulaError } = useSWR<
		PackageAnalytics,
		Error
	>(
		"https://formulae.brew.sh/api/analytics/install-on-request/30d.json",
		fetcher,
	);

	const { data: caskData, error: caskError } = useSWR<
		PackageAnalytics,
		Error
	>("https://formulae.brew.sh/api/analytics/cask-install/30d.json", fetcher);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { data: homebrewLatestGHRelease } = useSWR<Record<any, any>, Error>(
		"https://api.github.com/repos/Homebrew/brew/releases/latest",
		fetcher,
	);

	if (formulaError || caskError) {
		console.error("There has been an error loading analytics");
	}

	// Mock data for statistics
	const totalPackages =
		(caskData?.total_items || 0) + (formulaData?.total_items || 0);
	const totalDownloads =
		(caskData?.total_count || 0) + (formulaData?.total_count || 0);

	const router = useRouter();

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const input = form.querySelector(
			'input[type="search"]',
		) as HTMLInputElement;
		router.push(`/packages/?search=${input.value}`);
	};

	return (
		<SessionProvider>
			<div className="space-y-12 grow flex flex-col justify-center">
				<section className="text-center space-y-6 min-h-80 flex flex-col justify-center items-center">
					<h1 className="text-4xl font-bold mb-4 bg-background">
						Welcome to Brewfinder
					</h1>
					<p className="text-xl text-muted-foreground bg-background">
						Discover, save, and install{" "}
						<Link
							href="https://brew.sh/"
							target={"_blank"}
							rel="noopener noreferrer"
							className="underline decoration-primary decoration-dashed hover:decoration-solid decoration-2"
						>
							Homebrew
						</Link>{" "}
						packages with ease
					</p>
					<div className="w-full max-w-2xl">
						<form
							className="flex items-end sm:items-center space-x-2 sm:gap-x-4 flex-col gap-y-4 sm:flex-row"
							onSubmit={handleOnSubmit}
						>
							<Input
								type="search"
								placeholder="Search for Homebrew packages..."
								className="text-lg py-6 bg-secondary w-full m-0"
							/>
							<Button
								type="submit"
								size="lg"
								className="cursor-pointer"
							>
								<Search className="h-5 w-5" />
								Search
							</Button>
						</form>
					</div>
				</section>

				<section className="mb-12">
					<h2 className="text-2xl font-semibold mb-4 inline-block bg-background">
						Homebrew Statistics
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Current Homebrew Version
								</CardTitle>
								<Star className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									<Link
										href={
											(homebrewLatestGHRelease?.html_url as string) ??
											""
										}
										target={"_blank"}
										rel="noopener noreferrer"
										className="inline-flex items-center underline decoration-primary not-dark:decoration-foreground decoration-2 decoration-dashed hover:decoration-solid  hover:underline-solid text-secondary-foreground"
									>
										{(homebrewLatestGHRelease?.tag_name as string) ??
											"---"}
										<ArrowUpRight className="ml-1 h-4 w-4" />
									</Link>
								</div>
							</CardContent>
						</Card>
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
					</div>
				</section>

				{caskData && formulaData && (
					<section className="mb-12">
						<h2 className="text-2xl font-semibold mb-4 inline-block bg-background">
							Popular Packages
							<span className="text-muted-foreground text-sm block">
								(Last 30 Days)
							</span>
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<PopularPackagesChart
								chartHeader="Casks"
								data={caskData.items.slice(0, 5)}
							/>
							<PopularPackagesChart
								chartHeader="Formulas"
								data={formulaData.items.slice(0, 5)}
							/>
						</div>
					</section>
				)}
				{/*<section className="text-center">*/}
				{/*	<div className="flex justify-center space-x-4">*/}
				{/*		<Button asChild>*/}
				{/*			<Link href="/packages">View All Packages</Link>*/}
				{/*		</Button>*/}
				{/*	</div>*/}
				{/*</section>*/}
				<section>
					<Card className="max-w-3xl mx-auto px-4 bg-transparent outline-none border-none shadow-none">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="w-full flex justify-center">
								<h2 className="text-2xl font-semibold mb-2 inline-block bg-background">
									New to Homebrew?
								</h2>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-center text-muted-foreground mb-6 inline-block bg-background">
								Homebrew is the most popular and powerful
								package manager for <strong>macOS</strong>,
								available also for <strong>Linux</strong> and{" "}
								<strong>Windows</strong> (via WSL)
							</p>
							<div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
								<Button
									asChild
									variant="default"
									className="flex-1"
								>
									<Link
										href="https://brew.sh"
										target="_blank"
										rel="noopener noreferrer"
									>
										Installation Instructions
									</Link>
								</Button>
								<span className="px-2 bg-background text-muted-foreground">
									Or
								</span>
								<Button
									asChild
									variant="outline"
									className="flex-1"
								>
									<Link
										href="https://github.com/Homebrew/brew/releases/latest"
										target="_blank"
										rel="noopener noreferrer"
									>
										Download .pkg for macos
									</Link>
								</Button>
							</div>
						</CardContent>
						<CardFooter className="flex items-center justify-center">
							<p className="text-center text-sm text-muted-foreground inline-block bg-background">
								Follow the official installation instructions to
								get started with <strong>Homebrew</strong> and{" "}
								<strong>Brewfinder</strong>
							</p>
						</CardFooter>
					</Card>
				</section>
			</div>
		</SessionProvider>
	);
}
