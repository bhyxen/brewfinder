import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cask } from "@/types/homebrew";

type PackageArtifactsProps = Pick<Cask, "artifacts">;

export function PackageArtifacts({ artifacts }: PackageArtifactsProps) {
	function RenderNestedList({ data }: { data: unknown }) {
		if (typeof data !== "object" || data === null) {
			return (
				<ul className="list-disc pl-5 list-outside ul:list-revert">
					<li>
						<span>{String(data)}</span>
					</li>
				</ul>
			);
		}

		return (
			<ul className="list-disc pl-5 list-outside ul:list-revert">
				{Object.entries(data as Record<string, unknown>).map(
					([key, value]) => (
						<li key={key}>
							<p className="">{key}</p>
							<RenderNestedList data={value} />
						</li>
					),
				)}
			</ul>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Artifacts</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{artifacts.map((artifact, index) => (
						<div key={index}>
							{artifact.app && (
								<div>
									<h3 className="font-medium mb-2">
										Applications
									</h3>
									<ul className="list-disc pl-5">
										{artifact.app.map((app) => (
											<li key={app}>{app}</li>
										))}
									</ul>
								</div>
							)}
							{artifact.pkg && (
								<div>
									<h3 className="font-medium mb-2">
										Packages
									</h3>
									<ul className="list-disc pl-5">
										{artifact.pkg.map((pkg) => {
											if (
												typeof pkg === "object" &&
												pkg !== null &&
												!Array.isArray(pkg) &&
												"choices" in pkg
											) {
												return (
													<li
														key={
															pkg.choices[0]
																.choiceIdentifier
														}
													>
														{
															pkg.choices[0]
																.choiceIdentifier
														}
													</li>
												);
											} else {
												return (
													<li key={pkg as string}>
														{pkg}
													</li>
												);
											}
										})}
									</ul>
								</div>
							)}
							{artifact.binary && (
								<div>
									<h3 className="font-medium mb-2">
										Binaries
									</h3>
									<ul className="list-disc pl-5">
										{artifact.binary.map((bin, index) => (
											<li key={index}>
												{typeof bin === "object" &&
												!Array.isArray(bin) &&
												bin !== null
													? Object.entries(bin).map(
															([key, value]) => (
																<span key={key}>
																	{key}:{" "}
																	{value}
																</span>
															),
														)
													: bin}
											</li>
										))}
									</ul>
								</div>
							)}
							{artifact.uninstall && (
								<div>
									<h3 className="font-medium mb-2">
										Uninstall Scripts
									</h3>
									{artifact.uninstall.map((script, idx) => (
										<RenderNestedList
											key={idx}
											data={script}
										/>
									))}
								</div>
							)}
							{artifact.font && (
								<div>
									<h3 className="font-medium mb-2">Font</h3>
									<ul className="list-disc pl-5">
										{artifact.font.map((font) => (
											<li key={font}>{font}</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
