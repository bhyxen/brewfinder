import { z } from "zod";

export const itemCaskSchema = z.object({
	number: z.number(),
	cask: z.string(),
	count: z.string(),
	percent: z.string(),
});

export const itemForumlaSchema = z.object({
	number: z.number(),
	formula: z.string(),
	count: z.string(),
	percent: z.string(),
});

export const bottleFileSchema = z.object({
	cellar: z.string(),
	url: z.string(),
	sha256: z.string(),
});

export const usesFromMacOSBoundSchema = z.object({
	since: z.string(),
});

export const rubySourceChecksumSchema = z.object({
	sha256: z.string(),
});

export const headSchema = z.object({
	url: z.string(),
	branch: z.string(),
	using: z.string().nullable(),
});

export const buildErrorSchema = z.object({
	the30d: z.record(z.string(), z.number()),
});

export const runtimeDependencySchema = z.object({
	full_name: z.string(),
	version: z.string(),
	revision: z.number(),
	pkg_version: z.string(),
	declared_directly: z.boolean(),
});

export const uRLsStableSchema = z.object({
	url: z.string(),
	tag: z.string().nullable(),
	revision: z.string().nullable(),
	using: z.string().nullable(),
	checksum: z.string(),
});

export const versionsSchema = z.object({
	stable: z.string(),
	head: z.string(),
	bottle: z.boolean(),
});

export const choicesObjectSchema = z.object({
	attributeSetting: z.number(),
	choiceAttribute: z.string(),
	choiceIdentifier: z.string(),
});

export const installerScriptSchema = z.object({
	executable: z.string(),
});

export const uRLSpecsSchema = z.object({
	verified: z.string().nullable(),
	referer: z.string().nullable(),
	user_agent: z.string().nullable(),
});

export const conflictsWithSchema = z.object({
	cask: z.array(z.string()),
	formula: z.array(z.string()),
});

export const macOSSchema = z.record(z.string(), z.array(z.string()));

export const uninstallSchema = z.object({
	launchctl: z.array(z.string()).optional(),
	quit: z.string().optional(),
	delete: z.array(z.string()).optional(),
	rmdir: z.string().optional(),
});

export const zapSchema = z.object({
	trash: z.array(z.string()).optional(),
	rmdir: z.array(z.string()).optional(),
	launchctl: z.array(z.string()).optional(),
});

export const binaryClassSchema = z.object({
	target: z.string(),
});

export const packageAnalyticsSchema = z.object({
	category: z.string(),
	total_items: z.number(),
	start_date: z.date(),
	end_date: z.date(),
	total_count: z.number(),
	items: z.union([z.array(itemCaskSchema), z.array(itemForumlaSchema)]),
});

export const filesSchema = z.record(z.string(), bottleFileSchema);

export const headDependenciesSchema = z.object({
	build_dependencies: z.array(z.string()),
	dependencies: z.array(z.string()),
	test_dependencies: z.array(z.string()),
	recommended_dependencies: z.array(z.string()),
	optional_dependencies: z.array(z.string()),
	uses_from_macos: z.array(z.string()),
	uses_from_macos_bounds: z.array(usesFromMacOSBoundSchema),
});

export const installedSchema = z.object({
	version: z.string(),
	used_options: z.array(z.string()),
	built_as_bottle: z.boolean(),
	poured_from_bottle: z.boolean(),
	time: z.number(),
	runtime_dependencies: z.array(runtimeDependencySchema),
	installed_as_dependency: z.boolean(),
	installed_on_request: z.boolean(),
});

export const uRLsSchema = z.object({
	stable: uRLsStableSchema,
	head: headSchema,
});

export const analyticsSchema = z.object({
	install: z.record(z.string(), z.record(z.string(), z.number())),
	install_on_request: z.record(z.string(), z.record(z.string(), z.number())),
	build_error: buildErrorSchema,
});

export const linuxSchema = z.object({
	dependencies: z.array(z.string()),
	head_dependencies: headDependenciesSchema,
});

export const choicesSchema = z.object({
	choices: z.array(choicesObjectSchema),
});

export const installerSchema = z.object({
	script: installerScriptSchema,
});

export const dependsOnSchema = z.record(z.string(), macOSSchema);

export const bottleStableSchema = z.object({
	rebuild: z.number(),
	root_url: z.string(),
	files: filesSchema,
});

export const variationsSchema = z.object({
	x8664_linux: linuxSchema,
	arm64_linux: linuxSchema,
});

export const artifactSchema = z.object({
	uninstall: z.array(uninstallSchema).optional(),
	app: z.array(z.string()).optional(),
	binary: z.array(z.union([binaryClassSchema, z.string()])).optional(),
	uninstall_postflight: z.string().nullable(),
	dictionary: z.array(z.string()).optional(),
	installer: z.array(installerSchema).optional(),
	postflight: z.string().optional().nullable(),
	pkg: z.union([z.array(z.string()), z.array(choicesSchema)]).optional(),
	zap: z.array(zapSchema).optional(),
	suite: z.array(z.string()).optional(),
	font: z.array(z.string()).optional(),
});

export const caskSchema = z.object({
	token: z.string(),
	full_token: z.string(),
	old_tokens: z.array(z.string()),
	tap: z.string(),
	name: z.array(z.string()),
	desc: z.string(),
	homepage: z.string(),
	url: z.string(),
	url_specs: uRLSpecsSchema,
	version: z.string(),
	installed: z.string().nullable(),
	installed_time: z.string().nullable(),
	bundle_version: z.string().nullable(),
	bundle_short_version: z.string().nullable(),
	outdated: z.boolean(),
	sha256: z.string(),
	artifacts: z.array(artifactSchema),
	caveats: z.string().nullable(),
	depends_on: dependsOnSchema,
	conflicts_with: conflictsWithSchema,
	container: z.string().nullable(),
	auto_updates: z.boolean(),
	deprecated: z.boolean(),
	deprecation_date: z.string().nullable(),
	deprecation_reason: z.string().nullable(),
	deprecation_replacement: z.string().nullable(),
	disabled: z.boolean(),
	disable_date: z.string().nullable(),
	disable_reason: z.string().nullable(),
	disable_replacement: z.string().nullable(),
	tap_git_head: z.string(),
	languages: z.array(z.string()),
	ruby_source_path: z.string(),
	ruby_source_checksum: rubySourceChecksumSchema,
	variations: variationsSchema,
	analytics: analyticsSchema.optional(),
	generated_date: z.date().optional(),
});

export const bottleSchema = z.object({
	stable: bottleStableSchema,
});

export const formulaSchema = z.object({
	name: z.string(),
	full_name: z.string(),
	tap: z.string(),
	oldnames: z.array(z.string()),
	aliases: z.array(z.string()),
	versioned_formulae: z.array(z.string()),
	desc: z.string(),
	license: z.string(),
	homepage: z.string(),
	versions: versionsSchema,
	urls: uRLsSchema,
	revision: z.number(),
	version_scheme: z.number(),
	bottle: bottleSchema,
	pour_bottle_only_if: z.string().nullable(),
	keg_only: z.boolean(),
	keg_only_reason: z.string().nullable(),
	options: z.array(z.string()),
	build_dependencies: z.array(z.string()),
	dependencies: z.array(z.string()),
	test_dependencies: z.array(z.string()),
	recommended_dependencies: z.array(z.string()),
	optional_dependencies: z.array(z.string()),
	uses_from_macos: z.array(z.string()),
	uses_from_macos_bounds: z.array(usesFromMacOSBoundSchema),
	requirements: z.array(z.string()),
	conflicts_with: z.array(z.string()),
	conflicts_with_reasons: z.array(z.string()),
	link_overwrite: z.array(z.string()),
	caveats: z.string().nullable(),
	installed: z.array(installedSchema),
	linked_keg: z.string(),
	pinned: z.boolean(),
	outdated: z.boolean(),
	deprecated: z.boolean(),
	deprecation_date: z.string().nullable(),
	deprecation_reason: z.string().nullable(),
	deprecation_replacement: z.string().nullable(),
	disabled: z.boolean(),
	disable_date: z.string().nullable(),
	disable_reason: z.string().nullable(),
	disable_replacement: z.string().nullable(),
	post_install_defined: z.boolean(),
	service: z.string().nullable(),
	tap_git_head: z.string(),
	ruby_source_path: z.string(),
	ruby_source_checksum: rubySourceChecksumSchema,
	head_dependencies: headDependenciesSchema,
	variations: variationsSchema,
	analytics: analyticsSchema.optional(),
	generated_date: z.date().optional(),
});

export const packageSchema = z.union([formulaSchema, caskSchema]);
