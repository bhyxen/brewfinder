import { getById } from "@/controllers/packageListController";
import { NextRequest } from "next/server";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const listID = (await params).id;
	return getById(listID);
}
