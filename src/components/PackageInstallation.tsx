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
import { Copy, Check } from "lucide-react";

interface PackageInstallationProps {
	name: string;
	packageType: "formula" | "cask";
}

export function PackageInstallation({
	name,
	packageType,
}: PackageInstallationProps) {
	const [copied, setCopied] = useState(false);

	const installCommand = name.startsWith("brew")
		? name
		: `brew ${
				packageType === "formula" ? "install" : "install --cask"
		  } ${name}`;

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Installation</CardTitle>
				<CardDescription>
					Run this command to install the package(s)
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="bg-muted p-4 rounded-md font-mono text-sm mb-4 relative">
					{installCommand}
					<Button
						onClick={handleCopy}
						variant="outline"
						size="icon"
						className="absolute top-2 right-2 cursor-pointer"
					>
						{copied ? (
							<Check className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</Button>
				</div>
				<p className="text-sm text-muted-foreground">
					This command will install all the packages in this list using
					Homebrew.
				</p>
			</CardContent>
		</Card>
	);
}
