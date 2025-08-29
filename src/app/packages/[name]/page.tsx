import { PackageHeader } from "@/components/PackageHeader";
import { PackageInfo } from "@/components/PackageInfo";
import { PackageDependencies } from "@/components/PackageDependencies";
import { PackageVersions } from "@/components/PackageVersion";
import { PackageAnalytics } from "@/components/PackageAnalytics";
import { Package } from "@/types/homebrew";
import { PackageCaveats } from "@/components/PackageCaveats";
// import { PackageArtifacts } from "@/components/PackageArtifacts";
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

	const pkg: Package = await res.json();
	//
	// const currentPackageId =
	// 	pkg.token ?? (Array.isArray(pkg.name) ? pkg.name[0] : pkg.name);

	const currentPackageId = {
		id: pkg.token ?? (Array.isArray(pkg.name) ? pkg.name[0] : pkg.name),
		type: searchParamsResult.type,
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<PackageHeader
				name={Array.isArray(pkg.name) ? pkg.name[0] : pkg.name}
				description={pkg.desc}
				homepage={pkg.homepage}
				packageType={searchParamsResult.type}
				currentPackageId={currentPackageId}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
				<div className="md:col-span-2 space-y-8">
					<PackageInstallation
						name={currentPackageId.id}
						packageType={searchParamsResult.type}
					/>
					<PackageInfo
						license={"license" in pkg ? pkg.license : ""}
						version={pkg.versions?.stable ?? pkg.version}
						tap={pkg.tap}
						packageType={searchParamsResult.type}
						url={pkg.url ?? pkg.urls?.stable?.url}
						sha256={
							"sha256" in pkg && pkg.sha256 !== "no_check"
								? pkg.sha256
								: ""
						}
					/>

					{(("dependencies" in pkg && pkg.dependencies.length > 0) ||
						("depends_on" in pkg &&
							Object.keys(pkg.depends_on).length > 0) ||
						("build_dependencies" in pkg &&
							pkg.build_dependencies.length > 0) ||
						("uses_from_macos" in pkg &&
							pkg.uses_from_macos.length > 0)) && (
						<PackageDependencies
							buildDependencies={
								"build_dependencies" in pkg
									? pkg.build_dependencies
									: []
							}
							dependencies={pkg.dependencies ?? pkg.depends_on}
							usesMacos={
								"uses_from_macos" in pkg
									? pkg.uses_from_macos
									: []
							}
							packageType={searchParamsResult.type}
						/>
					)}

					{"versions" in pkg && (
						<PackageVersions
							versions={pkg.versions ?? pkg.version}
							bottle={pkg.bottle}
						/>
					)}

					{/* {"artifacts" in pkg && pkg.artifacts.length > 0 && (
						<PackageArtifacts artifacts={pkg.artifacts} />
					)} */}
				</div>
				<div className="md:col-span-1 space-y-8">
					{pkg.analytics && (
						<PackageAnalytics analytics={pkg.analytics} />
					)}
					{pkg.caveats && <PackageCaveats caveats={pkg.caveats} />}
				</div>
			</div>
		</div>
	);
}
