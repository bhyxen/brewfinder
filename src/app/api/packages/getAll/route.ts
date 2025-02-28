import { getAll } from "@/controllers/packageController";

export async function GET() {
	return getAll();
}
