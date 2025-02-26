import { getByUserId } from "@/controllers/packageListController";
import { NextRequest } from "next/server";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const userId = (await params).id;
	return getByUserId(userId);
}
