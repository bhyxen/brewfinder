"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	type SortingState,
	getSortedRowModel,
	type ColumnFiltersState,
	getFilteredRowModel,
} from "@tanstack/react-table";

import { XCircleIcon } from "lucide-react";

import { useSearchParams } from "next/navigation";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [typeFilter, setTypeFilter] = useState<string>("all");

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	useEffect(() => {
		if (typeFilter !== "all") {
			table.getColumn("type")?.setFilterValue(typeFilter);
		} else {
			table.getColumn("type")?.setFilterValue(undefined);
		}
	}, [typeFilter, table]);

	const searchParams = useSearchParams();

	const search = searchParams.get("search");

	useEffect(() => {
		table.getColumn("name")?.setFilterValue(search);
	}, [search, table]);

	return (
		<div>
			<div className="flex items-center pb-4 justify-between">
				<div className="flex max-w-md bg-secondary grow rounded-md">
					<Input
						placeholder="Filter packages..."
						value={
							(table
								.getColumn("name")
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) => {
							window.history.replaceState(
								null,
								"",
								`?search=${event.target.value}`,
							);
							table
								.getColumn("name")
								?.setFilterValue(event.target.value);
						}}
					/>
					<Button
						asChild
						variant="ghost"
						onClick={() => {
							window.history.replaceState(null, "", `?search=`);
							table.getColumn("name")?.setFilterValue("");
						}}
						className="cursor-pointer"
					>
						<div>
							<XCircleIcon className="h-4 w-4" />
						</div>
					</Button>
				</div>

				<Select value={typeFilter} onValueChange={setTypeFilter}>
					<SelectTrigger className="w-[180px] bg-secondary">
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="core">Formula</SelectItem>
						<SelectItem value="cask">Cask</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader className="bg-secondary">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className="bg-primary-foreground hover:bg-accent"
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className="bg-primary-foreground">
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between space-x-2 py-4 bg-primary-foreground px-2">
				<div className="text-sm text-muted-foreground ">
					Showing{" "}
					{table.getState().pagination.pageIndex *
						table.getState().pagination.pageSize +
						1}
					-
					{Math.min(
						(table.getState().pagination.pageIndex + 1) *
							table.getState().pagination.pageSize,
						table.getFilteredRowModel().rows.length,
					)}{" "}
					of {table.getFilteredRowModel().rows.length} results
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="cursor-pointer"
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="cursor-pointer"
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
