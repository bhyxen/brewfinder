import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Beer } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2">
					<Beer className="h-6 w-6" />
					<span className="text-xl font-bold">Brewfinder</span>
				</Link>
				<nav className="hidden md:flex space-x-4">
					<Link href="/">Home</Link>
					<Link href="/my-lists">My Lists</Link>
					<Link href="/public-lists">Public Lists</Link>
				</nav>
				<div className="flex items-center space-x-2">
					<Input
						type="search"
						placeholder="Search packages..."
						className="w-64"
					/>
					<Button variant="outline">Search</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
