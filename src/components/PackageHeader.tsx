"use client";
import { Beer, Package, ExternalLink, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddPackageToListForm from "@/components/AddPackageToListForm";
import { PackageDetails, PackageList } from "@/models/packageLists";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

interface PackageHeaderProps {
	name: string;
	description: string;
	homepage: string;
	packageType: "formula" | "cask";
	currentPackageId: PackageDetails;
}

export function PackageHeader({
	name,
	description,
	homepage,
	packageType,
	currentPackageId,
}: PackageHeaderProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const userId = session?.user?.id;
	const [open, setOpen] = useState(false);

	const fetcher = (...args: [RequestInfo, RequestInit?]) =>
		fetch(...args).then((res) => res.json());
	const {
		data: listData,
		error: listError,
		isLoading,
	} = useSWR<PackageList[]>(
		`/api/packageLists/getByUserId/${userId as string}`,
		fetcher,
	);

	const handleClick = (e) => {
		if (!session) {
			return router.push(
				`/sign-in?callbackUrl=${pathname}${encodeURIComponent("?" + searchParams)}`,
			);
		}
	};

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
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild onClick={handleClick}>
							<Button className="cursor-pointer">
								<BookmarkPlus />
								Add to List
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<AddPackageToListForm
								currentPackageId={currentPackageId}
								lists={listData ?? []}
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
