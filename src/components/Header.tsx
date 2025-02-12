import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Beer } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { navItems } from "@/lib/shared";
import { Separator } from "./ui/separator";

export default function Header() {
	return (
		<header className="border-b bg-accent">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2">
					<Beer className="h-6 w-6" />
					<span className="text-xl font-bold">Brewfinder</span>
				</Link>
				<nav className="space-x-4 hidden md:flex">
					{navItems.map((item) => {
						return (
							<Link href={item.url} className="font-medium" key={item.title}>
								{item.title}
							</Link>
						);
					})}
				</nav>
				<div className="items-center space-x-2 hidden md:flex">
					<Button variant="outline" asChild>
						<Link href="/sign-in">Sign In</Link>
					</Button>
					<Button asChild>
						<Link href="/register">Register</Link>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
