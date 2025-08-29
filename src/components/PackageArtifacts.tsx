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
									{artifact.app.map((app, idx) => (
										<RenderNestedList
											key={idx}
											data={app}
										/>
									))}
								</div>
							)}
							{artifact.pkg && (
								<div>
									<h3 className="font-medium mb-2">
										Packages
									</h3>
									{artifact.pkg.map((pkg, idx) => (
										<RenderNestedList
											key={idx}
											data={pkg}
										/>
									))}
								</div>
							)}
							{artifact.binary && (
								<div>
									<h3 className="font-medium mb-2">
										Binaries
									</h3>
									{artifact.binary.map((bin, idx) => (
										<RenderNestedList
											key={idx}
											data={bin}
										/>
									))}
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
									{artifact.font.map((font, idx) => (
										<RenderNestedList
											key={idx}
											data={font}
										/>
									))}
								</div>
							)}
							{artifact.zap && (
								<div>
									<h3 className="font-medium mb-2">Zap</h3>
									{artifact.zap.map((zap, idx) => (
										<RenderNestedList
											key={idx}
											data={zap}
										/>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
