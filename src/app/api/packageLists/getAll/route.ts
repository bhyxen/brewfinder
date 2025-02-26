import { connectDB } from "@/lib/db";
import PackageListModel, { PackageList } from "@/models/packageLists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse<PackageList>) {
	try {
		await connectDB();
		const PackageListResult = await PackageListModel.find();
		return NextResponse.json(PackageListResult);
	} catch (error) {
		NextResponse.error();
	}
}
