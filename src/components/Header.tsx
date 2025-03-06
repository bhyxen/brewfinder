import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Beer } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { auth } from "@/lib/auth";
import { UserMenu } from "./UserMenu";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Navbar from "@/components/Navbar";

export default async function Header() {
	const session = await auth();

	return (
		<header className="border-b text-secondary-foreground bg-secondary/50 backdrop-blur-xl">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2">
					<Beer className="h-6 w-6" />
					<span className="text-xl font-bold">Brewfinder</span>
				</Link>
				<div className="hidden md:block">
					<Navbar />
				</div>
				{/*<nav className="space-x-4 hidden md:flex items-center justify-between">
					{navItems.map((item) => {
						return (
							<Link
								href={item.url}
								className="text-sm"
								key={item.title}
							>
								{item.title}
							</Link>
						);
					})}
					Community Dropdown with Hover
					<div className="relative group">
						<Button
							variant="ghost"
							className="text-sm font-medium h-auto flex items-center gap-1 group p-0!"
						>
							Community
							<ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-data-[state=open]:rotate-180" />
						</Button>
						<div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-popover border border-border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
							<div className="py-1">
								<Link
									href="/roadmap"
									className="flex items-center px-4 py-2 text-sm hover:bg-muted"
								>
									<BarChart2 className="mr-2 h-4 w-4" />
									Roadmap
								</Link>
								<Link
									href={`${GITHUB_URL}/issues/new/choose`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center px-4 py-2 text-sm hover:bg-muted"
								>
									<Lightbulb className="mr-2 h-4 w-4" />
									Feature Requests
								</Link>
								<Link
									href="/support"
									className="flex items-center px-4 py-2 text-sm hover:bg-muted"
								>
									<HeartHandshakeIcon className="mr-2 h-4 w-4" />
									Support Project
								</Link>
							</div>
						</div>
					</div>
				</nav>*/}
				<div className="items-center space-x-2 hidden md:flex">
					{!session ? (
						<Button
							className="cursor-pointer text-primary-foreground not-dark:text-foreground"
							type="submit"
						>
							<Link href={`/sign-in`}>Sign In</Link>
						</Button>
					) : (
						<UserMenu session={session} />
					)}
					<Separator
						orientation="vertical"
						className="bg-muted-foreground h-5! mx-4"
					></Separator>
					<ModeToggle />
				</div>
				<SidebarTrigger className="md:hidden" />
			</div>
		</header>
	);
}
