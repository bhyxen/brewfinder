import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function MyLists() {
	// This would typically come from an API call or database
	const myLists = [
		{ id: 1, name: "Development Tools", packageCount: 5 },
		{ id: 2, name: "Data Science Essentials", packageCount: 8 },
		{ id: 3, name: "System Utilities", packageCount: 3 },
	];

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">My Lists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{myLists.map((list) => (
					<Card key={list.id}>
						<CardHeader>
							<CardTitle>{list.name}</CardTitle>
							<CardDescription>{list.packageCount} packages</CardDescription>
						</CardHeader>
						<CardContent>
							{/* Add more details or a preview of the list here */}
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" asChild>
								<Link href={`/my-lists/${list.id}`}>View</Link>
							</Button>
							<Button>Generate Script</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			<Button>Create New List</Button>
		</div>
	);
}
