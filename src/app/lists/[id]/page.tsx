"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import useSWR from "swr";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { PackageInstallation } from "@/components/PackageInstallation";
import {
	Heart,
	Share2,
	Package as PackageIcon,
	Calendar,
	ChevronDown,
	ChevronUp,
	Info,
} from "lucide-react";
import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { PackageDetails, PackageList } from "@/models/packageLists";
import { ObjectId } from "mongoose";
import { Cask, Formula, Package } from "@/types/homebrew";
import { useSession } from "next-auth/react";
import LucideDynamicIcon from "@/components/LucideDynamicIcon";
import CreatePackageListForm from "@/components/CreatePackageListForm";
import { User } from "next-auth";
import { SonnerSuccessIcon } from "@/lib/icons";

const MAX_VISIBLE_PACKAGES = 6;

export default function ListDetailsPage() {
	const params = useParams();
	const [isLiked, setIsLiked] = useState(false);
	const [likesUsers, setLikesUsers] = useState<User[]>([]);
	const [isPackagesExpanded, setIsPackagesExpanded] = useState(false);
	const [likesCount, setLikesCount] = useState<number>(0);
	const [open, setOpen] = useState(false);

	const listId = params.id;

	const { data: session } = useSession();

	const router = useRouter();
	const pathname = usePathname();

	type MultiFetcherParams = {
		likesUsersIds: ObjectId[] | undefined;
		url: string;
		packageIds: PackageDetails[] | undefined;
	};

	const fetcher = ([url, id, type, extension]: [
		string,
		string,
		string?,
		string?,
	]) =>
		fetch(
			`${url}${type ? "/" + type : ""}${id ? "/" + id : ""}${
				extension ? "." + extension : ""
			}`,
		).then((res) => res.json());

	function multiFetcher(params: MultiFetcherParams) {
		if (params.likesUsersIds) {
			return Promise.all(
				(params.likesUsersIds ?? []).map((likeUserId) => {
					return fetcher([params.url, likeUserId.toString()]);
				}),
			);
		} else if (params.packageIds) {
			return Promise.all(
				(params.packageIds ?? []).map((packageId) => {
					return fetcher([
						params.url,
						packageId.id,
						packageId.type,
						"json",
					]);
				}),
			);
		}
	}

	const { data: listDetails } = useSWR<PackageList, Error>(
		["/api/packageLists/getById", listId],
		fetcher,
	);

	const { data: likesUsersDetails } = useSWR(
		{ likesUsersIds: listDetails?.likes, url: "/api/users/getById" },
		multiFetcher,
	);

	useEffect(() => {
		if (
			listDetails?.likes?.includes(
				session?.user?.id as unknown as ObjectId,
			)
		) {
			setIsLiked(true);
		}
		setLikesUsers(likesUsersDetails ?? []);
		setLikesCount(listDetails?.likes?.length || 0);
	}, [listDetails, likesUsersDetails, session]);

	const { data: packagesDetails } = useSWR(
		{
			packageIds: listDetails?.packages,
			url: "https://formulae.brew.sh/api/",
		},
		multiFetcher,
	);

	if (!listDetails) {
		return <div>Loading...</div>;
	}

	const handleLike = async () => {
		console.log({ session });

		if (!session) {
			return router.push("/sign-in?callbackUrl=" + pathname);
		}

		setIsLiked(!isLiked);

		const newLikesArray = !isLiked
			? [...listDetails.likes, session?.user?.id]
			: listDetails.likes.filter(
					(like) => like.toString() !== session?.user?.id,
				);

		const requestBody = {
			...listDetails,
			likes: newLikesArray,
		};

		const result = await fetch(`/api/packageLists/update/${listId}`, {
			method: "POST",
			body: JSON.stringify(requestBody),
		});

		if (result.ok) {
			toast.success(isLiked ? "Removed from likes" : "Added to likes");
			setLikesCount(likesCount + (isLiked ? -1 : 1));

			const newLikesUsers = !isLiked
				? [...(likesUsersDetails ?? []), session?.user]
				: (likesUsersDetails ?? []).filter(
						(user) => user.id.toString() !== session?.user?.id,
					);

			setLikesUsers(newLikesUsers);
		} else {
			toast.error("Failed to update likes");
		}
	};

	const handleShare = () => {
		navigator.clipboard.writeText(
			window.location.protocol + window.location.host + pathname,
		);

		toast("Sharing link copied to clipboard", {
			description:
				"Please note that if the list is private, it won't be accessible to others.",
			icon: SonnerSuccessIcon,
		});
	};

	const visiblePackages: Package[] = (
		packagesDetails ? packagesDetails : []
	).slice(0, MAX_VISIBLE_PACKAGES);

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="mb-8">
				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-6 rounded-lg">
					<LucideDynamicIcon
						icon={listDetails.icon}
						className="h-24 w-24 sm:h-32 sm:w-32"
					/>
					<div className="flex-1 text-center text-left">
						<div className="flex flex-col lg:flex-row items-start lg:items-center sm:justify-start space-x-2 mb-2">
							<h1 className="text-3xl font-bold">
								{listDetails.name}
							</h1>
							<Badge>
								{listDetails.isPublic ? "Public" : "Private"}
							</Badge>
						</div>
						<p className="text-lg text-muted-foreground">
							{listDetails.description}
						</p>
						<p className="text-sm text-muted-foreground mt-2">
							Created by{" "}
							{listDetails.owner.name ?? listDetails.owner.email}{" "}
							on{" "}
							{listDetails.createdAt
								? format(new Date(listDetails.createdAt), "PPP")
								: "N/A"}
						</p>
						<p className="text-sm text-muted-foreground">
							Last updated:{" "}
							{listDetails.updatedAt
								? format(new Date(listDetails.updatedAt), "PPP")
								: "N/A"}
						</p>
						<div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
							{isLiked ? (
								<AlertDialog open={open} onOpenChange={setOpen}>
									<AlertDialogTrigger asChild>
										<Button
											variant={
												isLiked ? "default" : "outline"
											}
											size="sm"
											className="w-full sm:w-auto cursor-pointer"
										>
											<Heart
												className={`h-4 w-4 mr-2 ${
													isLiked
														? "fill-current"
														: ""
												}`}
											/>
											{isLiked ? "Liked" : "Like"} (
											{likesCount})
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												Do you really want to remove
												this list from your likes?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												className="cursor-pointer"
												onClick={handleLike}
											>
												Continue
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							) : (
								<Button
									variant={isLiked ? "default" : "outline"}
									size="sm"
									onClick={handleLike}
									className="w-full sm:w-auto cursor-pointer"
								>
									<Heart
										className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
									/>
									{isLiked ? "Liked" : "Like"} ({likesCount})
								</Button>
							)}

							<Button
								variant="outline"
								size="sm"
								onClick={handleShare}
								className="w-full sm:w-auto cursor-pointer"
							>
								<Share2 className="h-4 w-4 mr-2" />
								Share
							</Button>
							{session?.user?.id === listDetails.owner.id && (
								<CreatePackageListForm
									packages={[]}
									currentData={listDetails}
									triggerClassName="w-full sm:w-auto "
								/>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-xl font-semibold flex items-center">
								<PackageIcon className="mr-2 h-5 w-5" />
								Packages in this list (
								{listDetails.packages.length})
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Collapsible
								open={isPackagesExpanded}
								onOpenChange={setIsPackagesExpanded}
								className="space-y-2"
							>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{visiblePackages.map((pkg, index) => {
										const pkgId =
											pkg.token ??
											(Array.isArray(pkg.name)
												? pkg.name[0]
												: pkg.name);

										return (
											<li key={`pkgId-${index}`}>
												<Card>
													<CardContent className="flex items-center justify-between p-4">
														<div className="flex items-center">
															<PackageIcon className="h-5 w-5 mr-2" />
															<span>{pkgId}</span>
														</div>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger
																	asChild
																>
																	<Button
																		asChild
																		size="icon"
																	>
																		<Link
																			href={`/packages/${
																				pkgId
																			}?type=${
																				pkg.tap.includes(
																					"cask",
																				)
																					? "cask"
																					: "formula"
																			}`}
																			className="font-medium text-center"
																		>
																			<Info className="h-4 w-4" />
																		</Link>
																	</Button>
																</TooltipTrigger>
																<TooltipContent>
																	<p>
																		{Array.isArray(
																			pkg.name,
																		)
																			? pkg
																					.name[0]
																			: pkg.name}
																	</p>
																	<p>
																		{
																			pkg.desc
																		}
																	</p>
																	<Badge
																		variant="secondary"
																		className="my-2"
																	>
																		{
																			listDetails?.packages?.find(
																				(
																					pkgList,
																				) =>
																					pkgList.id ===
																					(pkg.token ??
																						(Array.isArray(
																							pkg.name,
																						)
																							? pkg
																									.name[0]
																							: pkg.name)),
																			)
																				?.type
																		}
																	</Badge>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</CardContent>
												</Card>
											</li>
										);
									})}
								</ul>
								{listDetails.packages.length >
									MAX_VISIBLE_PACKAGES && (
									<>
										<CollapsibleContent className="space-y-2">
											<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												{(packagesDetails
													? (packagesDetails as
															| Cask[]
															| Formula[])
													: []
												)
													.slice(MAX_VISIBLE_PACKAGES)
													.map((pkg, index) => (
														<li
															key={`${
																"token" in pkg
																	? pkg.token
																	: Array.isArray(
																				pkg.name,
																		  )
																		? pkg
																				.name[0]
																		: pkg.name
															}-${index + MAX_VISIBLE_PACKAGES}`}
														>
															<Card>
																<CardContent className="flex items-center justify-between p-4">
																	<div className="flex items-center">
																		<PackageIcon className="h-5 w-5 mr-2" />
																		<span>
																			{"token" in
																			pkg
																				? pkg.token
																				: Array.isArray(
																							pkg.name,
																					  )
																					? pkg
																							.name[0]
																					: pkg.name}
																		</span>
																	</div>
																	<TooltipProvider>
																		<Tooltip>
																			<TooltipTrigger
																				asChild
																			>
																				<Button
																					asChild
																					size="icon"
																				>
																					<Link
																						href={`/packages/${
																							"token" in
																							pkg
																								? pkg.token
																								: Array.isArray(
																											pkg.name,
																									  )
																									? pkg
																											.name[0]
																									: pkg.name
																						}?type=${
																							pkg.tap.includes(
																								"cask",
																							)
																								? "cask"
																								: "formula"
																						}`}
																						className="font-medium text-center"
																					>
																						<Info className="h-4 w-4" />
																					</Link>
																				</Button>
																			</TooltipTrigger>
																			<TooltipContent>
																				<p>
																					{Array.isArray(
																						pkg.name,
																					)
																						? pkg
																								.name[0]
																						: pkg.name}
																				</p>
																				<p>
																					{
																						pkg.desc
																					}
																				</p>
																			</TooltipContent>
																		</Tooltip>
																	</TooltipProvider>
																</CardContent>
															</Card>
														</li>
													))}
											</ul>
										</CollapsibleContent>

										<CollapsibleTrigger asChild>
											<Button
												variant="outline"
												className="w-full mt-2 cursor-pointer"
											>
												{isPackagesExpanded ? (
													<>
														<ChevronUp className="h-4 w-4 mr-2" />
														Show Less
													</>
												) : (
													<>
														<ChevronDown className="h-4 w-4 mr-2" />
														Show All (
														{
															listDetails.packages
																.length
														}
														)
													</>
												)}
											</Button>
										</CollapsibleTrigger>
									</>
								)}
							</Collapsible>
						</CardContent>
					</Card>

					<PackageInstallation
						name={listDetails.installationCommand}
						packageType="formula"
					/>
				</div>

				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-xl font-semibold flex items-center">
								<Calendar className="mr-2 h-5 w-5" />
								List Details
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<p>
								<strong>Created:</strong>{" "}
								{listDetails.createdAt
									? format(
											new Date(listDetails.createdAt),
											"PPP",
										)
									: "N/A"}
							</p>
							<p>
								<strong>Last Updated:</strong>{" "}
								{listDetails.updatedAt
									? format(
											new Date(listDetails.updatedAt),
											"PPP",
										)
									: "N/A"}
							</p>
							<p>
								<strong>Owner:</strong>{" "}
								{listDetails.owner.name ??
									listDetails.owner.email}
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-xl font-semibold flex items-center">
								<Heart className="mr-2 h-5 w-5" />
								Likes ({likesCount})
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{!!likesUsers &&
									likesUsers.map((likeUser) => {
										return (
											<TooltipProvider key={likeUser.id}>
												<Tooltip>
													<TooltipTrigger asChild>
														<Avatar className="h-8 w-8">
															<AvatarFallback>
																{(
																	likeUser?.name ??
																	likeUser?.email ??
																	""
																)
																	.slice(0, 2)
																	.toUpperCase()}
															</AvatarFallback>
															<AvatarImage
																src={
																	likeUser?.image ??
																	undefined
																}
																alt={
																	likeUser?.name ??
																	likeUser?.email ??
																	undefined
																}
															/>
														</Avatar>
													</TooltipTrigger>
													<TooltipContent>
														<p>
															{likeUser.name ??
																likeUser.email}
														</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										);
									})}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
