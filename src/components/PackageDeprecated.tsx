import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface PackageDeprecatedProps {
	deprecated: boolean;
	deprecation_date?: string | null;
	deprecation_reason?: string | null;
	deprecation_replacement_cask?: string | null;
	deprecation_replacement_formula?: string | null;
	originalPackageTap?: string;
}

export function PackageDeprecated({
	deprecation_date,
	deprecation_reason,
	deprecation_replacement_cask,
	deprecation_replacement_formula,
	originalPackageTap,
}: PackageDeprecatedProps) {
	return (
		<Card className="border-amber-500/30 overflow-clip">
			<CardHeader className="flex flex-row items-center space-x-2 bg-red-500/20 not-dark:bg-red-500/10">
				<AlertTriangle className="text-amber-500 not-dark:text-amber-700" />
				<CardTitle>Deprecated</CardTitle>
			</CardHeader>
			<CardContent className="text-sm space-y-2  bg-red-500/20 not-dark:bg-red-500/10">
				<p className="">
					This package is deprecated and may be removed in the future.
				</p>
				<dl className="space-y-1">
					{deprecation_reason && (
						<div>
							<dt className="font-medium text-muted-foreground">
								Reason
							</dt>
							<dd>{deprecation_reason}</dd>
						</div>
					)}
					{deprecation_date && (
						<div>
							<dt className="font-medium text-muted-foreground">
								Date
							</dt>
							<dd>
								{new Date(deprecation_date).toLocaleDateString(
									undefined,
									{
										weekday: "short",
										day: "2-digit",
										month: "short",
										year: "numeric",
									},
								)}
							</dd>
						</div>
					)}
					{(deprecation_replacement_cask ||
						deprecation_replacement_formula) && (
						<div>
							<dt className="font-medium text-muted-foreground">
								Replacement
							</dt>
							<dd>
								<Button asChild variant="link">
									<Link
										href={`/packages/${
											deprecation_replacement_cask ||
											deprecation_replacement_formula
										}?type=${
											originalPackageTap?.includes("cask")
												? "cask"
												: "formula"
										}`}
										className="p-0! text-primary not-dark:text-secondary-foreground"
									>
										{deprecation_replacement_cask ||
											deprecation_replacement_formula}
									</Link>
								</Button>
							</dd>
						</div>
					)}
				</dl>
			</CardContent>
		</Card>
	);
}
