"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { PackageDetails, PackageList } from "@/models/packageLists";
import LucideDynamicIcon from "@/components/LucideDynamicIcon";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
	list: z.string(),
});

type Props = {
	lists: PackageList[];
	currentPackageId: PackageDetails;
};

export default function AddPackageToListForm({
	lists,
	currentPackageId,
}: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// toast(
			// 	<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			// 		<code className="text-white">
			// 			{JSON.stringify(values, null, 2)}
			// 		</code>
			// 	</pre>,
			// );

			const newPackagesList = [
				...(lists.find((list) => list?._id?.toString() === values.list)
					?.packages ?? []),
				currentPackageId,
			];

			const newListBody = {
				packages: newPackagesList,
			};

			const updatedList = await fetch(
				`/api/packageLists/update/${values.list}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newListBody),
				},
			);

			if (updatedList.ok) {
				toast.success("Package added to list successfully");
			} else {
				toast.error("Failed to add package to list. Please try again.");
			}
		} catch (error) {
			console.error("Form submission error: ", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 max-w-3xl mx-auto"
			>
				<FormField
					control={form.control}
					name="list"
					render={({ field }) => (
						<FormItem>
							<FormLabel>List</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="h-auto cursor-pointer">
										<SelectValue placeholder="Select one list" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="bg-secondary">
									{lists.map((item) => (
										<SelectItem
											key={item?._id?.toString()}
											value={
												item?._id?.toString() as string
											}
											className="hover:bg-primary! hover:text-secondary! cursor-pointer"
										>
											<LucideDynamicIcon
												className="hover:text-secondary!"
												icon={item.icon}
											/>
											{item.name}
										</SelectItem>
									))}
									{lists.length > 0 ? (
										<div className="relative">
											<div className="absolute inset-0 flex items-center">
												<Separator className="w-full bg-muted-foreground" />
											</div>
											<div className="relative flex justify-center text-sm">
												<span className="px-2 bg-secondary text-muted-foreground">
													Or
												</span>
											</div>
										</div>
									) : (
										<Label className="py-1.5 pr-8 pl-2 text-sm">
											You don&#39;t have any lists yet
										</Label>
									)}

									<Link
										href={`/lists/user?createNewList=true&package=${encodeURI(JSON.stringify(currentPackageId))}`}
									>
										<Button
											className="cursor-pointer w-full my-2 not-dark:text-foreground"
											variant="outline"
										>
											Create new list
										</Button>
									</Link>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="block ml-auto cursor-pointer" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}
