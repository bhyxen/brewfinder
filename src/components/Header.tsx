import Link from "next/link";
import { Button } from "@/components/ui/button";
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
				<nav className="flex space-x-4">
					<Link href="/" className="font-medium">
						Home
					</Link>
					<Link href="/my-lists" className="font-medium">
						My Lists
					</Link>
					<Link href="/public-lists" className="font-medium">
						Public Lists
					</Link>
				</nav>
				<div className="flex items-center space-x-2">
					<Button variant="default">Sign In</Button>
					<Button variant="secondary">Register</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
