"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { PackageFilteredData } from "@/types/homebrew";

import { SortAsc, SortDesc } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

export default function Packages() {
	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());
	const {
		data: packagesData,
		error: packagesError,
		isLoading,
	} = useSWR<PackageFilteredData[], Error>("/api/packages/getAll", fetcher);

	if (packagesError) return <div>Failed to load</div>;
	if (!packagesData || isLoading) return <div>Loading...</div>;

	const columns: ColumnDef<PackageFilteredData>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						className="p-0!"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
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
						href={`/packages/${pkg.token ?? pkg.name}?type=${pkg.type}`}
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

				return pkg.version.slice(0, 9);
			},
		},
		{
			accessorKey: "type",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						className="p-0!"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
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
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const pkg = row.original;

				return (
					<Button asChild>
						<Link
							href={`/packages/${pkg.token ?? pkg.name}?type=${pkg.type}`}
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
		<div>
			<h1 className="text-3xl inline-block font-bold bg-background mb-8">
				Homebrew Packages
			</h1>
			<DataTable columns={columns} data={packagesData} />
		</div>
	);
}
