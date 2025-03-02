import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import Link from "next/link";
import { PackageList } from "@/models/packageLists";
import PackageListCard from "@/components/PackageListCard";
import { getAllPublic } from "@/controllers/packageListController";

export default async function PublicLists() {
	const res = await getAllPublic();
	const publicLists: PackageList[] = (await res?.json()) || [];

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Public Lists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{publicLists.map((list) => (
					<PackageListCard
						key={list._id?.toString() as string}
						listId={list._id?.toString() as string}
						listName={list.name}
						packageCount={list.packages.length}
						installationCommand={list.installationCommand}
						listDescription={list.description}
						owner={(list.owner?.name ?? list.owner.email) as string}
						icon={list.icon}
					/>
				))}
			</div>
		</div>
	);
}
