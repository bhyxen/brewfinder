import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackageInfoProps {
	license?: string;
	version: string;
	tap: string;
	packageType: "formula" | "cask";
	url: string;
	sha256: string;
}

export function PackageInfo({
	license,
	version,
	tap,
	packageType,
	url,
	sha256,
}: PackageInfoProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Package Information</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{license && (
						<div>
							<dt className="font-medium text-muted-foreground">
								License
							</dt>
							<dd>{license}</dd>
						</div>
					)}
					<div>
						<dt className="font-medium text-muted-foreground">
							Version
						</dt>
						<dd>{version}</dd>
					</div>
					<div>
						<dt className="font-medium text-muted-foreground">
							Tap
						</dt>
						<dd>{tap}</dd>
					</div>
					<div>
						<dt className="font-medium text-muted-foreground">
							Type
						</dt>
						<dd className="capitalize">{packageType}</dd>
					</div>
					<div className="sm:col-span-2">
						<dt className="font-medium text-muted-foreground">
							URL
						</dt>
						<dd className="break-all">
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="underline text-primary not-dark:text-secondary-foreground hover:underline"
							>
								{url}
							</a>
						</dd>
					</div>
					{sha256 && (
						<div className="sm:col-span-2">
							<dt className="font-medium text-muted-foreground">
								SHA256
							</dt>
							<dd className="break-all">{sha256}</dd>
						</div>
					)}
				</dl>
			</CardContent>
		</Card>
	);
}
