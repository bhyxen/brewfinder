import { deleteList } from "@/controllers/packageListController";
import { NextRequest } from "next/server";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const listID = (await params).id;

	return deleteList(listID);
}
