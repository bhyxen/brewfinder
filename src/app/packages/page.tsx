"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Cask, Formula } from "@/types/homebrew";

import { SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
	fetch(...args).then((res) => res.json());

type Package = Formula | Cask;

export default function Packages() {
	const { data: formulaData, error: formulaError } = useSWR<Formula[], Error>(
		"https://formulae.brew.sh/api/formula.json",
		fetcher
	);
	const { data: caskData, error: caskError } = useSWR<Cask[], Error>(
		"https://formulae.brew.sh/api/cask.json",
		fetcher
	);

	if (formulaError || caskError) return <div>Failed to load</div>;
	if (!formulaData || !caskData) return <div>Loading...</div>;

	const packagesData: Package[] = [...formulaData, ...caskData];

	const columns: ColumnDef<Package>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						className="p-0!"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Name
						{column.getIsSorted() === "asc" ? (
							<SortAsc className="ml-2 h-4 w-4" />
						) : (
							<SortDesc className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
			cell: ({ row }) => {
				const pkg = row.original;
				return (
					<Link
						href={`/packages/${
							"token" in pkg
								? pkg.token
								: Array.isArray(pkg.name)
								? pkg.name[0]
								: pkg.name
						}?type=${
							(row.getValue("tap") as string).includes("cask")
								? "cask"
								: "formula"
						}`}
						className="font-medium"
					>
						{row.getValue("name")}
					</Link>
				);
			},
		},
		{
			accessorKey: "desc",
			header: "Description",
		},
		{
			accessorKey: "version",
			header: "Version",
			cell: ({ row }) => {
				const pkg = row.original;

				return ("versions" in pkg ? pkg.versions?.stable : pkg.version).slice(
					0,
					9
				);
			},
		},
		{
			accessorKey: "tap",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						className="p-0!"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Type
						{column.getIsSorted() === "asc" ? (
							<SortAsc className="ml-2 h-4 w-4" />
						) : (
							<SortDesc className="ml-2 h-4 w-4" />
						)}
					</Button>
				);
			},
			cell: ({ row }) => {
				return (row.getValue("tap") as string).includes("cask")
					? "cask"
					: "formula";
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const pkg = row.original;

				return (
					<Button asChild>
						<Link
							href={`/packages/${
								"token" in pkg
									? pkg.token
									: Array.isArray(pkg.name)
									? pkg.name[0]
									: pkg.name
							}?type=${
								(row.getValue("tap") as string).includes("cask")
									? "cask"
									: "formula"
							}`}
							className="font-medium"
						>
							Details
						</Link>
					</Button>
				);
			},
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Homebrew Packages</h1>
				<DataTable columns={columns} data={packagesData} />
			</div>
		</div>
	);
}
