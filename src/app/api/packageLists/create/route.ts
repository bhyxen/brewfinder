import { connectDB } from "@/lib/db";
import PackageListModel, { PackageList } from "@/models/packageLists";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		await connectDB();

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

		const newPackageList = PackageListModel.create({
			name,
			description,
			packages,
			installationCommand,
			owner,
			isPublic,
			likes,
			icon,
		});

		return NextResponse.json(newPackageList);
	} catch (error) {
		console.error({ error });
		NextResponse.error();
	}
}
