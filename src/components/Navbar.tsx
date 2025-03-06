"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart2, Lightbulb, HeartHandshake } from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/lib/shared";
import { GITHUB_URL } from "@/lib/constants";

export default function Navbar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navItems.map((item) => (
					<NavigationMenuItem key={item.title}>
						<Link
							href={item.url}
							className={`${navigationMenuTriggerStyle()} bg-transparent p-2! lg:p-4!`}
						>
							<item.icon className="mr-2 h-4 w-4 hidden lg:inline-block" />
							{item.title}
						</Link>
					</NavigationMenuItem>
				))}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent p-2! lg:p-4!">
						Community
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="p-2 w-48 bg-background shadow-md rounded-md">
							<li>
								<Link
									href="/roadmap"
									className="flex items-center px-4 py-2 text-sm hover:bg-muted"
								>
									<BarChart2 className="mr-2 h-4 w-4" />
									Roadmap
								</Link>
							</li>
							<li>
								<Link
									href={`${GITHUB_URL}/issues/new/choose`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center px-4 py-2 text-sm hover:bg-muted"
								>
									<Lightbulb className="mr-2 h-4 w-4" />
									Feature Requests
								</Link>
							</li>
							<li>
								<Link
									href="/support"
									className="flex items-center px-4 py-2 text-sm hover:bg-muted"
								>
									<HeartHandshake className="mr-2 h-4 w-4" />
									Support Project
								</Link>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
