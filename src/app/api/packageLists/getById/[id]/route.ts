import { connectDB } from "@/lib/db";
import PackageListModel, { PackageList } from "@/models/packageLists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const listID = (await params).id;

	try {
		await connectDB();
		const PackageListResult = await PackageListModel.findById(listID);
		return NextResponse.json(PackageListResult);
	} catch (error) {
		NextResponse.error();
	}
}
