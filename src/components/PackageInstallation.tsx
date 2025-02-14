"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";

interface PackageInstallationProps {
	name: string;
	packageType: "formula" | "cask";
}

export function PackageInstallation({
	name,
	packageType,
}: PackageInstallationProps) {
	const [copied, setCopied] = useState(false);

	const installCommand =
		packageType === "formula"
			? `brew install ${name}`
			: `brew install --cask ${name}`;

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand);
		setCopied(true);
		toast.success("Command copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Installation</CardTitle>
				<CardDescription>
					Run this command to install the package
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="bg-muted p-4 rounded-md font-mono text-sm mb-4 flex justify-between items-center">
					<span>{installCommand}</span>
					<Button
						onClick={handleCopy}
						variant="outline"
						className="cursor-pointer"
					>
						{!copied ? (
							<Copy className="h-4 w-4" />
						) : (
							<>
								<CopyCheck className="h-4 w-4" />
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
