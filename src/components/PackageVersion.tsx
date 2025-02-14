import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Formula } from "@/types/homebrew";
import { Check } from "lucide-react";
import { Fragment } from "react";

interface PackageVersionsProps {
	versions: {
		stable: string;
		head: string;
	};
	bottle: Pick<Formula, "bottle">["bottle"];
}

export function PackageVersions({ versions, bottle }: PackageVersionsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Versions and Bottles</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="space-y-4">
					<div>
						<h3 className="font-medium mb-2">Versions</h3>
						<dl className="grid grid-cols-2 gap-2">
							<dt className="text-muted-foreground">Stable</dt>
							<dd>{versions.stable}</dd>
							{versions.head && (
								<>
									<dt className="text-muted-foreground">Head</dt>
									<dd>{versions.head}</dd>
								</>
							)}
						</dl>
					</div>
				</div>
				{bottle && (
					<div className="space-y-4">
						<div>
							<h3 className="font-medium mb-2">Compatibility</h3>
							<dl className="grid grid-cols-2 gap-2">
								{Object.keys(bottle.stable.files).map((key) => {
									return (
										<Fragment key={key}>
											<dt className="text-muted-foreground">{key}</dt>
											<dd>{<Check />}</dd>
										</Fragment>
									);
								})}
							</dl>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
