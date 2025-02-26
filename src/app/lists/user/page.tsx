import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Edit } from "lucide-react";
import { PackageList } from "@/models/packageLists";
import useSWR from "swr";
import { getByUserId } from "@/controllers/packageListController";
import PackageListCard from "@/components/PackageListCard";

export default async function MyLists() {
	const session = await auth();

	const userId = session?.user?.id;

	const res = await getByUserId(userId as string);
	const lists: PackageList[] = await res.json();

	const handleCopyCommandClick = () => {
		// Copy the installation command to the clipboard
		navigator.clipboard.writeText("brew install package-name");
	};

	// This would typically come from an API call or database
	const myLists = [
		{ id: 1, name: "Development Tools", packageCount: 5 },
		{ id: 2, name: "Data Science Essentials", packageCount: 8 },
		{ id: 3, name: "System Utilities", packageCount: 3 },
	];

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">My Lists</h1>
				<Button className="cursor-pointer">
					<Edit className="w-6 h-6"></Edit>
					Create New List
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{lists.map((list) => (
					<PackageListCard
						key={list._id?.toString() as string}
						listId={list._id?.toString() as string}
						listName={list.name}
						packageCount={list.packages.length}
						installationCommand={list.installationCommand}
						listDescription={list.description}
						owner={(list.owner?.name ?? list.owner.email) as string}
					/>
				))}
			</div>
		</div>
	);
}
