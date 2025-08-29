import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type PackageType = "cask" | "formula";

interface BaseProps {
	packageType: PackageType;
}

interface FormulaProps extends BaseProps {
	packageType: "formula";
	conflictsWithFormula: string[];
	reasons?: string[];
}

interface CaskProps extends BaseProps {
	packageType: "cask";
	conflictsWithCasks: string[];
	conflictsWithFormula: string[];
}

type PackageConflictsWithProps = FormulaProps | CaskProps;

export function PackageConflictsWith(props: PackageConflictsWithProps) {
	return (
		<Card className="border-amber-500/30 overflow-clip">
			<CardHeader className="bg-primary/20 not-dark:bg-primary/30">
				<CardTitle>Conflicts</CardTitle>
			</CardHeader>
			<CardContent className="bg-primary/20 not-dark:bg-primary/30 text-sm space-y-3">
				{props.packageType === "cask" ? (
					<div className="space-y-3">
						{props.conflictsWithCasks?.length > 0 && (
							<div>
								<div className="font-medium text-muted-foreground mb-1">
									Casks
								</div>
								<ul className="list-none list-inside space-y-1">
									{props.conflictsWithCasks.map((name) => (
										<li key={`cask-${name}`}>
											<Link
												href={`/packages/${name}?type=cask`}
												className="text-primary not-dark:text-secondary-foreground hover:underline"
											>
												{name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
						{props.conflictsWithFormula?.length > 0 && (
							<div>
								<div className="font-medium text-muted-foreground mb-1">
									Formulae
								</div>
								<ul className="list-none list-inside space-y-1">
									{props.conflictsWithFormula.map((name) => (
										<li key={`formula-${name}`}>
											<Link
												href={`/packages/${name}?type=formula`}
												className="text-primary not-dark:text-secondary-foreground hover:underline"
											>
												{name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				) : (
					<div className="space-y-3">
						<div>
							<div className="font-medium text-muted-foreground mb-1">
								Formulae
							</div>
							{props.conflictsWithFormula.length > 0 ? (
								<ul className="list-none list-inside space-y-1">
									{props.conflictsWithFormula.map((name) => (
										<li key={`formula-${name}`}>
											<Link
												href={`/packages/${name}?type=formula`}
												className="text-primary not-dark:text-secondary-foreground hover:underline"
											>
												{name}
											</Link>
										</li>
									))}
								</ul>
							) : (
								<p className="text-muted-foreground">
									No conflicts listed.
								</p>
							)}
						</div>
						{props.reasons && props.reasons.length > 0 && (
							<div>
								<div className="font-medium text-muted-foreground mb-1">
									Reasons
								</div>
								<ul className="list-none list-inside space-y-1">
									{props.reasons.map((reason, idx) => (
										<li key={`reason-${idx}`}>{reason}</li>
									))}
								</ul>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
