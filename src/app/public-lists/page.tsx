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

export default function PublicLists() {
	// This would typically come from an API call or database
	const publicLists = [
		{
			id: 1,
			name: "Web Development Essentials",
			author: "johndoe",
			packageCount: 10,
		},
		{
			id: 2,
			name: "Data Science Toolkit",
			author: "janedoe",
			packageCount: 15,
		},
		{ id: 3, name: "DevOps Tools", author: "bobsmith", packageCount: 8 },
	];

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Public Lists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{publicLists.map((list) => (
					<Card key={list.id}>
						<CardHeader>
							<CardTitle>{list.name}</CardTitle>
							<CardDescription>By {list.author}</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{list.packageCount} packages</p>
						</CardContent>
						<CardFooter>
							<Button variant="outline" asChild>
								<Link href={`/public-lists/${list.id}`}>View</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
