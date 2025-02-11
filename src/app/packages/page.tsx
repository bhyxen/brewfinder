"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

// Mock data for packages
const mockPackages = [
	{
		name: "wget",
		description: "Internet file retriever",
		category: "Networking",
		stars: 1000,
	},
	{
		name: "ffmpeg",
		description: "Play, record, convert, and stream audio and video",
		category: "Multimedia",
		stars: 2000,
	},
	{
		name: "git",
		description: "Distributed revision control system",
		category: "Development",
		stars: 3000,
	},
	{
		name: "node",
		description: "Platform built on V8 to build network applications",
		category: "Development",
		stars: 4000,
	},
	{
		name: "python",
		description:
			"Interpreted, interactive, object-oriented programming language",
		category: "Development",
		stars: 5000,
	},
];

export default function Packages() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [categoryFilter, setCategoryFilter] = useState("All");

	const filteredAndSortedPackages = mockPackages
		.filter(
			(pkg) =>
				pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(categoryFilter === "All" || pkg.category === categoryFilter)
		)
		.sort((a, b) => {
			if (a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b])
				return sortOrder === "asc" ? -1 : 1;
			if (a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b])
				return sortOrder === "asc" ? 1 : -1;
			return 0;
		});

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
					className="md:w-1/3"
				/>
				<Select onValueChange={setCategoryFilter} defaultValue="All">
					<SelectTrigger className="md:w-1/4">
						<SelectValue placeholder="Filter by category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Categories</SelectItem>
						<SelectItem value="Networking">Networking</SelectItem>
						<SelectItem value="Multimedia">Multimedia</SelectItem>
						<SelectItem value="Development">Development</SelectItem>
					</SelectContent>
				</Select>
				<Select onValueChange={setSortBy} defaultValue="name">
					<SelectTrigger className="md:w-1/4">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Name</SelectItem>
						<SelectItem value="stars">Stars</SelectItem>
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
						<TableHead>Category</TableHead>
						<TableHead>Stars</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredAndSortedPackages.map((pkg) => (
						<TableRow key={pkg.name}>
							<TableCell className="font-medium">{pkg.name}</TableCell>
							<TableCell>{pkg.description}</TableCell>
							<TableCell>{pkg.category}</TableCell>
							<TableCell>{pkg.stars}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
