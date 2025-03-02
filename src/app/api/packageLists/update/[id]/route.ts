import { update } from "@/controllers/packageListController";
import { PackageList } from "@/models/packageLists";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const listID = (await params).id;

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

	return update({
		_id: listID as unknown as ObjectId,
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
