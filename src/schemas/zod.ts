import { z } from "zod";

export const formSchema = z.object({
	name: z.string().nonempty("Please provide a name"),
	description: z.string().nonempty("Please provide a description"),
	packages: z.array(z.string()).min(1, "Please select at least one packages"),
	isPublic: z.boolean().default(false).optional(),
	icon: z.string().optional(),
});
