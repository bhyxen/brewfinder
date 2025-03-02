import { getAllPublic } from "@/controllers/packageListController";

export async function GET() {
	return getAllPublic();
}
