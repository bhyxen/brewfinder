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
import { useSession } from "next-auth/react";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { navItems } from "@/lib/shared";
import { UserMenu } from "@/components/UserMenu";
import { Separator } from "@/components/ui/separator";
import { SidebarClose } from "lucide-react";
import * as React from "react";

// Menu items.

type Props = {
	className?: string;
};

export function AppSidebar({ className }: Props) {
	const { toggleSidebar } = useSidebar();
	const { data: session } = useSession();

	return (
		<Sidebar side="right" variant="floating" className={className}>
			<SidebarHeader>
				<SidebarGroup>
					<SidebarGroupLabel className="flex items-center">
						Account
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 ml-auto"
							onClick={() => {
								toggleSidebar();
							}}
						>
							<SidebarClose className="rotate-180" />
							<span className="sr-only">Toggle Sidebar</span>
						</Button>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<div className="flex items-center space-x-2 mt-2">
									{!session ? (
										<Button
											className="cursor-pointer"
											type="submit"
										>
											<Link href={`/sign-in`}>
												Sign In
											</Link>
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
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										onClick={() => toggleSidebar()}
									>
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
