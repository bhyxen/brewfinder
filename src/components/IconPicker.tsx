"use client";
import React, { useMemo, useState } from "react";
import { icons as LucideIcons } from "lucide-react";

type Icons = {
	// the name of the component
	name: string;
	// a more human-friendly name
	friendly_name: string;
	Component: React.FC<React.ComponentPropsWithoutRef<"svg">>;
};

export const useIconPickerLucide = (): {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	icons: Icons[];
} => {
	const icons: Icons[] = useMemo(
		() =>
			Object.entries(LucideIcons).map(([iconName, IconComponent]) => ({
				name: iconName,
				// split the icon name at capital letters and join them with a space
				friendly_name: iconName.match(/[A-Z][a-z]+/g)?.join(" ") ?? iconName,

				Component: IconComponent as React.FC<
					React.ComponentPropsWithoutRef<"svg">
				>,
			})),
		[]
	);
	// these lines can be removed entirely if you're not using the controlled component approach
	const [search, setSearch] = useState("");
	//   memoize the search functionality
	const filteredIcons = useMemo(() => {
		return icons.filter((icon) => {
			if (search === "") {
				return true;
			} else if (icon.name.toLowerCase().includes(search.toLowerCase())) {
				return true;
			} else {
				return false;
			}
		});
	}, [icons, search]);

	return { search, setSearch, icons: filteredIcons };
};

export const IconRendererLucide = ({
	icon,
	...rest
}: {
	icon: string;
} & React.ComponentPropsWithoutRef<"svg">) => {
	const IconComponent = LucideIcons[icon as keyof typeof LucideIcons];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent data-slot="icon" {...rest} />;
};
