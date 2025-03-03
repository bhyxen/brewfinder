import { Beer, Package, ExternalLink, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddPackageToListForm from "@/components/AddPackageToListForm";
import { auth } from "@/lib/auth";
import { getByUserId } from "@/controllers/packageListController";
import { PackageDetails, PackageList } from "@/models/packageLists";

interface PackageHeaderProps {
	name: string;
	description: string;
	homepage: string;
	packageType: "formula" | "cask";
	currentPackageId: PackageDetails;
}

export async function PackageHeader({
	name,
	description,
	homepage,
	packageType,
	currentPackageId,
}: PackageHeaderProps) {
	const session = await auth();

	const userId = session?.user?.id;

	const listsResponse = await getByUserId(userId as string);
	const lists: PackageList[] = await listsResponse.json();

	return (
		<div className="flex items-start space-x-4">
			<div className="bg-primary text-primary-foreground p-3 rounded-lg">
				{packageType === "formula" ? (
					<Beer size={32} />
				) : (
					<Package size={32} />
				)}
			</div>
			<div className="flex flex-grow justify-between items-start">
				<div>
					<h1 className="text-3xl font-bold">{name}</h1>
					<p className="text-xl text-muted-foreground mt-2">
						{description}
					</p>
					<div className="mt-2 flex items-center space-x-4">
						<span className="text-muted-foreground text-sm">
							{packageType === "formula" ? "Formula" : "Cask"}
						</span>
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<Popover>
						<PopoverTrigger asChild>
							<Button className="cursor-pointer">
								<BookmarkPlus />
								Add to List
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<AddPackageToListForm
								currentPackageId={currentPackageId}
								lists={lists}
							/>
						</PopoverContent>
					</Popover>

					<Button asChild variant={"secondary"}>
						<Link
							href={homepage}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ExternalLink />
							Visit Homepage
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
