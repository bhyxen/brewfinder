import { auth } from "@/lib/auth";
import { PackageList } from "@/models/packageLists";
import { getByUserId } from "@/controllers/packageListController";
import PackageListCard from "@/components/PackageListCard";
import CreatePackageListForm from "@/components/createPackageListForm";
import { PackageFilteredData } from "@/types/homebrew";
import { getAll as getAllPackages } from "@/controllers/packageController";

export default async function MyLists() {
	const session = await auth();

	const userId = session?.user?.id;

	const res = await getByUserId(userId as string);
	const lists: PackageList[] = await res.json();

	const packagesData: PackageFilteredData[] = await (
		await getAllPackages()
	).json();

	// const iconsData = await (await fetch("https://api.iconify.design/search?query=home")).json();

	// console.log({ iconsData });

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">My Lists</h1>

				<CreatePackageListForm packages={packagesData} />
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
