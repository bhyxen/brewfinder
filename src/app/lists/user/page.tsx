import { auth } from "@/lib/auth";
import { PackageList } from "@/models/packageLists";
import { getByUserId } from "@/controllers/packageListController";
import PackageListCard from "@/components/PackageListCard";
import CreatePackageListForm from "@/components/CreatePackageListForm";
import { PackageFilteredData } from "@/types/homebrew";
import { getAll as getAllPackages } from "@/controllers/packageController";

export default async function MyLists(props: {
	searchParams: {
		createNewList: string | undefined;
		package: string | undefined;
	};
}) {
	const { createNewList, package: defaultPkg } = await props.searchParams;

	const session = await auth();

	const userId = session?.user?.id;

	const res = await getByUserId(userId as string);
	const lists: PackageList[] = await res.json();

	const packagesData: PackageFilteredData[] = await (
		await getAllPackages()
	).json();

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold inline-block bg-background">
					My Lists
				</h1>

				<CreatePackageListForm
					isOpen={Boolean(createNewList)}
					packages={packagesData}
					defaultPackage={defaultPkg}
				/>
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
						icon={list.icon}
					/>
				))}
			</div>
		</div>
	);
}
