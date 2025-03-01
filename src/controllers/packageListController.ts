import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import PackageListModel, { PackageList } from "@/models/packageLists";

export const getAll = async () => {
	try {
		await connectDB();
		const PackageListResult = await PackageListModel.find();
		return NextResponse.json(PackageListResult);
	} catch (error) {
		NextResponse.error();
	}
};

export const getById = async (listID: string) => {
	try {
		await connectDB();
		const PackageListResult = await PackageListModel.findById(listID);
		return NextResponse.json(PackageListResult);
	} catch (error) {
		NextResponse.error();
	}
};

export const getByUserId = async (userID: string) => {
	try {
		await connectDB();
		const PackageListResult = await PackageListModel.find({
			"owner.id": userID,
		});

		if (!PackageListResult) {
			return new NextResponse("Package list not found", {
				status: 404,
			});
		}

		return NextResponse.json(PackageListResult);
	} catch (error) {
		console.error(error);
		return new NextResponse(
			(error as Error)?.message || "Internal server error",
			{
				status: 500,
			}
		);
	}
};

export const create = async ({
	name,
	description,
	packages,
	installationCommand,
	owner,
	isPublic,
	likes,
	icon,
}: PackageList) => {
	try {
		await connectDB();

		const newPackageList = await PackageListModel.create({
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
};
