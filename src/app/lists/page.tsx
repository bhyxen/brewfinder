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

export default function PublicLists() {
	// This would typically come from an API call or database
	const publicLists = [
		{
			_id: 1,
			name: "Web Development Essentials",
			owner: { name: "johndoe", email: "" },
			packageCount: 10,
			packages: [1, 2, 3],
			installationCommand: "npm install package-name",
			description: "A collection of tools for web developers",
		},
		{
			_id: 2,
			name: "Data Science Toolkit",
			owner: { name: "janedoe", email: "" },
			packageCount: 15,
			packages: [1, 2, 3],
			installationCommand: "pip install package-name",
			description: "A collection of tools for data scientists",
		},
		{
			_id: 3,
			name: "DevOps Tools",
			owner: { name: "bobsmith", email: "" },
			packageCount: 8,
			packages: [1, 2, 3],
			installationCommand: "brew install package-name",
			description: "A collection of tools for DevOps engineers",
		},
	];

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
						icon="package"
					/>
				))}
			</div>
		</div>
	);
}
