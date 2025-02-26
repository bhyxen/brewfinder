import { create } from "@/controllers/packageListController";
import { PackageList } from "@/models/packageLists";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const {
		name,
		description,
		packages,
		installationCommand,
		owner,
		isPublic,
		likes,
		icon,
	}: PackageList = await req.json();

	return create({
		name,
		description,
		packages,
		installationCommand,
		owner,
		isPublic,
		likes,
		icon,
	});
}
