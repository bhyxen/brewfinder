import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cask, Formula } from "@/types/homebrew";

interface PackageDependenciesProps {
	buildDependencies: string[];
	dependencies:
		| Pick<Cask, "depends_on">["depends_on"]
		| Pick<Formula, "dependencies">["dependencies"];
	usesMacos: string[];
	packageType: "formula" | "cask";
}

export function PackageDependencies({
	buildDependencies,
	dependencies,
	usesMacos,
	packageType,
}: PackageDependenciesProps) {
	const renderDependencies = (
		deps: Pick<PackageDependenciesProps, "dependencies">["dependencies"]
	) => {
		if (Array.isArray(deps)) {
			return (
				<ul className="list-disc pl-5">
					{deps.map((dep) => (
						<li key={dep}>{dep}</li>
					))}
				</ul>
			);
		} else {
			return (
				<div className="space-y-2">
					{Object.entries(deps).map(([key, values]) => {
						return (
							<div key={key}>
								<h4 className="font-medium">{key}</h4>
								<ul className="list-disc pl-5">
									{Object.entries(values).map(([key, value]) => (
										<li key={key + value}>
											{key} {value}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Dependencies</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{packageType === "formula" && buildDependencies.length > 0 && (
						<div>
							<h3 className="font-medium mb-2">Build Dependencies</h3>
							<ul className="list-disc pl-5">
								{buildDependencies.map((dep) => (
									<li key={dep}>{dep}</li>
								))}
							</ul>
						</div>
					)}
					<div>
						<h3 className="font-medium mb-2">
							{packageType === "formula"
								? "Runtime Dependencies"
								: "Dependencies"}
						</h3>
						{renderDependencies(dependencies)}
					</div>
					{packageType === "formula" && usesMacos.length > 0 && (
						<div>
							<h3 className="font-medium mb-2">Uses from macOS</h3>
							<ul className="list-disc pl-5">
								{usesMacos.map((dep) => (
									<li key={dep}>{dep}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
