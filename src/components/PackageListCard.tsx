"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface PackageListCardProps {
	listName: string;
	packageCount: number;
	listId: string;
	installationCommand: string;
	listDescription: string;
	owner: string;
}

function PackageListCard({
	listName,
	packageCount,
	listId,
	installationCommand,
	listDescription,
	owner,
}: PackageListCardProps) {
	const [copied, setCopied] = useState(false);

	const handleCopyCommandClick = () => {
		navigator.clipboard.writeText(installationCommand);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{listName}</CardTitle>
				<CardDescription>By {owner}</CardDescription>
				<Badge variant="secondary">{packageCount} Packages</Badge>
			</CardHeader>
			<CardContent>
				{/* Add more details or a preview of the list here */}
				{listDescription}
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" asChild>
					<Link href={`/lists/${listId}`}>View</Link>
				</Button>
				<Button onClick={handleCopyCommandClick} className="cursor-pointer">
					{copied ? (
						<Check className="h-4 w-4" />
					) : (
						<Copy className="h-4 w-4" />
					)}
					Copy install command
				</Button>
			</CardFooter>
		</Card>
	);
}

export default PackageListCard;
