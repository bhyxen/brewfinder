import { Globe, Home, Package, List } from "lucide-react";

export const navItems = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "All Packages",
		url: "/packages",
		icon: Package,
	},
	{
		title: "My Lists",
		url: "/my-lists",
		icon: List,
	},
	{
		title: "Public Lists",
		url: "/public-lists",
		icon: Globe,
	},
];
