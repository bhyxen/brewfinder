import { Beer, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PackageHeaderProps {
	name: string;
	description: string;
	homepage: string;
	packageType: "formula" | "cask";
}

export function PackageHeader({
	name,
	description,
	homepage,
	packageType,
}: PackageHeaderProps) {
	return (
		<div className="flex items-start space-x-4">
			<div className="bg-primary text-primary-foreground p-3 rounded-lg">
				{packageType === "formula" ? <Beer size={32} /> : <Package size={32} />}
			</div>
			<div className="flex flex-grow justify-between items-start">
				<div>
					<h1 className="text-3xl font-bold">{name}</h1>
					<p className="text-xl text-muted-foreground mt-2">{description}</p>
					<div className="mt-2 flex items-center space-x-4">
						<span className="text-muted-foreground text-sm">
							{packageType === "formula" ? "Formula" : "Cask"}
						</span>
					</div>
				</div>
				<div>
					<Button asChild variant={"outline"}>
						<Link href={homepage} target="_blank" rel="noopener noreferrer">
							<ExternalLink />
							Visit Homepage
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
