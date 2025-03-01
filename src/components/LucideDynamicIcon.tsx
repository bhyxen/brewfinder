import { NotebookText } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import React from "react";

type Props = { icon: string; className: string };

export default function LucideDynamicIcon({ icon, className }: Props) {
	// Convert PascalCase to lower kebab case for Lucide icon access
	const kebabName = icon
		.replace(/([A-Z])/g, "-$1")
		.toLowerCase()
		.slice(1); // Slice(1) to remove leading hyphen

	return (
		<DynamicIcon
			name={kebabName as IconName}
			fallback={() => <NotebookText />}
			className={className}
		/>
	);
}
