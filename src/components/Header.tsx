import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Beer } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { navItems } from "@/lib/shared";
import { auth, signIn, signOut } from "@/lib/auth";
import { UserMenu } from "./UserMenu";
import { Separator } from "./ui/separator";

export default async function Header() {
	const logoutAction = async () => {
		"use server";
		await signOut();
	};
	const session = await auth();
	console.log({ session });
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
					{!session ? (
						<form
							action={async () => {
								"use server";
								await signIn();
							}}
							className="m-0"
						>
							<Button className="w-full cursor-pointer" type="submit">
								Sign In
							</Button>
						</form>
					) : (
						<>
							<UserMenu session={session} logoutAction={logoutAction} />
						</>
					)}
					<Separator
						orientation="vertical"
						className="bg-muted-foreground h-5! mx-4"
					></Separator>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
