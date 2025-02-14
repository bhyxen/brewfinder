"use client";

import useSWR from "swr";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cask, Formula } from "@/types/homebrew";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
	fetch(...args).then((res) => res.json());

type SortBy = string;

type Package = Formula | Cask;

export default function Packages() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy]: [SortBy, Dispatch<SetStateAction<SortBy>>] =
		useState("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [typeFilter, setTypeFilter] = useState("all");

	const { data: formulaData, error: formulaError } = useSWR(
		"https://formulae.brew.sh/api/formula.json",
		fetcher
	);
	const { data: caskData, error: caskError } = useSWR(
		"https://formulae.brew.sh/api/cask.json",
		fetcher
	);

	if (formulaError || caskError) return <div>Failed to load</div>;
	if (!formulaData || !caskData) return <div>Loading...</div>;

	let filteredAndSortedPackages: Formula[] | Cask[] = [];

	const categories: string[] = [];

	if (formulaData) {
		filteredAndSortedPackages = formulaData
			.concat(caskData)
			.filter((pkg: Package) => {
				return (
					(Array.isArray(pkg.name) ? pkg.name[0] : pkg.name)
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) &&
					(typeFilter === "all" ||
						(pkg.tap.includes("cask") ? "cask" : "formula") === typeFilter)
				);
			});
		// .sort((a: Package, b: Package) => {
		// 	if (a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b])
		// 		return sortOrder === "asc" ? -1 : 1;
		// 	if (a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b])
		// 		return sortOrder === "asc" ? 1 : -1;
		// 	return 0;
		// });

		formulaData.concat(caskData).forEach((pkg: Package) => {
			const type = pkg.tap.includes("cask") ? "cask" : "formula";

			if (categories.indexOf(type) === -1) {
				categories.push(type);
			}
		});
	}
	const toggleSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Homebrew Packages</h1>

			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<Input
					placeholder="Search packages..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="md:w-1/3 bg-muted"
				/>
				<Select
					onValueChange={(value) => {
						console.log({ value });
						setTypeFilter(value);
					}}
				>
					<SelectTrigger className="md:w-1/4 bg-muted" defaultValue="all">
						<SelectValue placeholder="Filter by category" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((type, index) => {
							return (
								<SelectItem key={index} value={type}>
									{type}
								</SelectItem>
							);
						})}
						<SelectItem value="all">All</SelectItem>
					</SelectContent>
				</Select>
				<Select onValueChange={setSortBy}>
					<SelectTrigger className="md:w-1/4 bg-muted">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Name</SelectItem>
						<SelectItem value="type">Type</SelectItem>
					</SelectContent>
				</Select>
				<Button onClick={toggleSortOrder} className="md:w-auto">
					{sortOrder === "asc" ? (
						<SortAsc className="mr-2 h-4 w-4" />
					) : (
						<SortDesc className="mr-2 h-4 w-4" />
					)}
					{sortOrder === "asc" ? "Ascending" : "Descending"}
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Version</TableHead>
						<TableHead>Type</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredAndSortedPackages.map((pkg) => (
						<TableRow
							key={pkg.name + pkg.tap + ("token" in pkg ? pkg.token : "")}
						>
							<TableCell className="font-medium max-w-64">
								{Array.isArray(pkg.name) ? pkg.name[0] : pkg.name}
							</TableCell>
							<TableCell className="max-w-64">{pkg.desc}</TableCell>
							<TableCell>
								{("versions" in pkg ? pkg.versions?.stable : pkg.version).slice(
									0,
									9
								)}
							</TableCell>
							<TableCell className="max-w-64">
								{pkg.tap.includes("cask") ? "cask" : "formula"}
							</TableCell>
							<TableCell className="max-w-64">
								<Button asChild>
									<Link
										href={`/packages/${
											"token" in pkg ? pkg.token : pkg.name
										}?type=${pkg.tap.includes("cask") ? "cask" : "formula"}`}
									>
										Details
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
