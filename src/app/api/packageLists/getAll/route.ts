import { getAll } from "@/controllers/packageListController";

export async function GET() {
	return getAll();
}
