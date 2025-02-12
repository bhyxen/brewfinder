"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { navItems } from "@/lib/shared";

// Menu items.

type Props = {
	className?: string;
};

export function AppSidebar({ className }: Props) {
	const { toggleSidebar } = useSidebar();

	return (
		<Sidebar side="right" variant="floating" className={className}>
			<SidebarHeader>
				<SidebarGroup className={className}>
					<SidebarGroupLabel>Account</SidebarGroupLabel>
					<SidebarGroupContent className={className}>
						<SidebarMenu>
							<SidebarMenuItem>
								<div className="flex items-center space-x-2">
									<Button
										variant="outline"
										asChild
										onClick={() => toggleSidebar()}
									>
										<Link href="/sign-in">Sign In</Link>
									</Button>
									<Button asChild onClick={() => toggleSidebar()}>
										<Link href="/register">Register</Link>
									</Button>
									<ModeToggle />
								</div>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarHeader>
			<SidebarContent className={className}>
				<SidebarGroup className={className}>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent className={className}>
						<SidebarMenu className={className}>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild onClick={() => toggleSidebar()}>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
