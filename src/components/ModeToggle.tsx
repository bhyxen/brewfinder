"use client";

import * as React from "react";
import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="cursor-pointer"
				>
					<Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className={`cursor-pointer flex justify-between ${theme === "light" && "bg-secondary"}`}
					onClick={() => setTheme("light")}
				>
					Light {theme === "light" && <Check />}
				</DropdownMenuItem>
				<DropdownMenuItem
					className={`cursor-pointer flex justify-between ${theme === "dark" && "bg-secondary"}`}
					onClick={() => setTheme("dark")}
				>
					Dark {theme === "dark" && <Check />}
				</DropdownMenuItem>
				<DropdownMenuItem
					className={`cursor-pointer flex justify-between ${theme === "system" && "bg-secondary"}`}
					onClick={() => setTheme("system")}
				>
					System {theme === "system" && <Check />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
