import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cask } from "@/types/homebrew";
import React from "react";

export function PackageAnalytics({ analytics }: Pick<Cask, "analytics">) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Installation Analytics</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{Object.entries(analytics!.install).map(([period, data]) => (
						<div key={period}>
							<h3 className="font-medium mb-2">Last {period}</h3>
							<dl className="grid grid-cols-2 gap-2">
								{Object.entries(data).map(([key, value]) => (
									<React.Fragment key={key}>
										<dt className="text-muted-foreground">{key}</dt>
										<dd>{value.toLocaleString()}</dd>
									</React.Fragment>
								))}
							</dl>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
