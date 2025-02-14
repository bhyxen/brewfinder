import { PackageHeader } from "@/components/PackageHeader";
import { PackageInfo } from "@/components/PackageInfo";
import { PackageDependencies } from "@/components/PackageDependencies";
import { PackageVersions } from "@/components/PackageVersion";
import { PackageAnalytics } from "@/components/PackageAnalytics";
import { Formula, Cask } from "@/types/homebrew";
import { PackageCaveats } from "@/components/PackageCaveats";
import { PackageArtifacts } from "@/components/PackageArtifacts";
import { PackageInstallation } from "@/components/PackageInstallation";

type SearchParamsResult = {
	type: "cask" | "formula";
};

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ name: string }>;
	searchParams: Promise<SearchParamsResult>;
}) {
	const slug = (await params).name;

	const searchParamsResult: SearchParamsResult = await searchParams;

	let res;

	if (searchParamsResult.type === "cask") {
		res = await fetch(`https://formulae.brew.sh/api/cask/${slug}.json`);
	} else {
		res = await fetch(`https://formulae.brew.sh/api/formula/${slug}.json`);
	}

	const pkg: Formula | Cask = await res.json();

	return (
		<div className="container mx-auto px-4 py-8">
			<PackageHeader
				name={Array.isArray(pkg.name) ? pkg.name[0] : pkg.name}
				description={pkg.desc}
				homepage={pkg.homepage}
				packageType={searchParamsResult.type}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
				<div className="md:col-span-2 space-y-8">
					<PackageInstallation
						name={
							searchParamsResult.type === "formula"
								? Array.isArray(pkg.name)
									? pkg.name[0]
									: pkg.name
								: "token" in pkg
								? pkg.token
								: ""
						}
						packageType={searchParamsResult.type}
					/>
					<PackageInfo
						license={"license" in pkg ? pkg.license : ""}
						version={"versions" in pkg ? pkg.versions?.stable : pkg.version}
						tap={pkg.tap}
						packageType={searchParamsResult.type}
						url={"url" in pkg ? pkg.url : pkg.urls?.stable?.url}
						sha256={
							"sha256" in pkg && pkg.sha256 !== "no_check" ? pkg.sha256 : ""
						}
					/>

					{(("dependencies" in pkg && pkg.dependencies.length > 0) ||
						("depends_on" in pkg && Object.keys(pkg.depends_on).length > 0) ||
						("build_dependencies" in pkg &&
							pkg.build_dependencies.length > 0) ||
						("uses_from_macos" in pkg && pkg.uses_from_macos.length > 0)) && (
						<PackageDependencies
							buildDependencies={
								"build_dependencies" in pkg ? pkg.build_dependencies : []
							}
							dependencies={
								"dependencies" in pkg ? pkg.dependencies : pkg.depends_on
							}
							usesMacos={"uses_from_macos" in pkg ? pkg.uses_from_macos : []}
							packageType={searchParamsResult.type}
						/>
					)}

					{"versions" in pkg && (
						<PackageVersions versions={pkg.versions} bottle={pkg.bottle} />
					)}

					{"artifacts" in pkg && pkg.artifacts.length > 0 && (
						<PackageArtifacts artifacts={pkg.artifacts} />
					)}
					{pkg.caveats && <PackageCaveats caveats={pkg.caveats} />}
				</div>
				{pkg.analytics && (
					<div>
						<PackageAnalytics analytics={pkg.analytics} />
					</div>
				)}
			</div>
		</div>
	);
}
