"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { Session } from "next-auth";

type Props = {
	session: Session;
	logoutAction: () => Promise<void>;
};

export function UserMenu({ session, logoutAction }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-8 w-8 rounded-full cursor-pointer m-0"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage
							src="/avatars/01.png"
							alt={session.user?.email as string}
						/>
						<AvatarFallback className="">
							{session.user?.email?.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						{session.user?.name && (
							<p className="text-sm font-medium leading-none">
								{session.user?.name}
							</p>
						)}
						<p className="text-sm leading-none text-muted-foreground">
							{session.user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				{/* <DropdownMenuSeparator />
				 <DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<form action={logoutAction} className="w-full">
						<Button
							variant="outline"
							type="submit"
							className="w-full cursor-pointer"
						>
							<LogOut className="mr-2 h-4 w-4" />
							Log Out
						</Button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
