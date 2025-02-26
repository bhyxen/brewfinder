import { NextRequest, NextResponse } from "next/server";
import { adapter } from "@/lib/auth";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const userId = (await params).id;

	if (!adapter?.getUser) return NextResponse.error();

	try {
		const user = await adapter.getUser(userId);
		return NextResponse.json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		NextResponse.error();
	}
}
