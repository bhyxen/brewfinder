"use client";
import { KeyboardEvent, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckIcon, Edit } from "lucide-react/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from "@/components/ui/extension/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { PackageFilteredData } from "@/types/homebrew";
import { formSchema } from "@/schemas/zod";
import { Badge } from "./ui/badge";
import {
	IconRendererLucide,
	useIconPickerLucide,
} from "@/components/IconPicker";

type Props = {
	packages: PackageFilteredData[];
};

export default function CreatePackageListForm({ packages }: Props) {
	const { search, setSearch, icons } = useIconPickerLucide();

	// console.log({ packages });

	// packages = packages.slice(0, 100);
	const [filteredPackages, setFilteredPackages] = useState<
		PackageFilteredData[]
	>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			packages: [],
			public: false,
			icon: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log({ values });
		try {
			toast(
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(values, null, 2)}</code>
				</pre>
			);
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	}

	let timeoutId: NodeJS.Timeout;

	function debounce(cb: (...args: any[]) => void, delay: number) {
		return (...args: any[]) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				cb(...args);
			}, delay);
		};
	}

	function handleMultiSelectorKeyup(
		event: KeyboardEvent<HTMLInputElement>
	): void {
		const inputValue = (event.target as HTMLInputElement).value;

		if (inputValue.length < 1) {
			setFilteredPackages([]);
			return;
		}

		debounce(() => {
			setFilteredPackages(() => {
				return packages
					.filter((pkg) => {
						return (Array.isArray(pkg.name) ? pkg.name[0] : pkg.name)
							.toLowerCase()
							.includes(inputValue);
					})
					.slice(0, 10);
			});
		}, 500)();
	}

	// console.log({ filteredPackages });

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="cursor-pointer">
					<Edit className="w-6 h-6"></Edit>
					Create New List
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle>Create new package list</DialogTitle>
					<DialogDescription>Enter the details of the list</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 w-full mx-auto"
						id="create-package-list-form"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="" type="text" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder=""
											className="resize-none"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="packages"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Packages</FormLabel>
										<FormControl>
											<MultiSelector
												shouldFilter={false} // fix issue mentioned in https://github.com/shadcn-ui/ui/discussions/3862
												values={field.value ? field.value : []}
												onValuesChange={(value) => {
													setFilteredPackages([]);
													field.onChange(value);
												}}
												loop
											>
												<MultiSelectorTrigger>
													<MultiSelectorInput
														onKeyUp={handleMultiSelectorKeyup}
														placeholder="Search packages"
													/>
												</MultiSelectorTrigger>
												<MultiSelectorContent>
													<MultiSelectorList
														showNoResults={true}
														noResultsText="Start searching for a package..."
													>
														{filteredPackages.map((pkg) => {
															return (
																<MultiSelectorItem
																	key={(pkg.token ?? pkg.name) + pkg.type}
																	value={pkg.token ?? pkg.name}
																>
																	<div className="flex items-center justify-between space-x-2 grow">
																		{pkg.name}
																		<Badge>{pkg.type}</Badge>
																	</div>
																</MultiSelectorItem>
															);
														})}
													</MultiSelectorList>
												</MultiSelectorContent>
											</MultiSelector>
										</FormControl>
										<FormDescription>
											Select multiple packages to be included.
										</FormDescription>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="public"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Make Public</FormLabel>
										<FormDescription>
											Other users will be able to see and like your list
										</FormDescription>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Icon</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-[300px] justify-between cursor-pointer",
														!field.value && "text-muted-foreground"
													)}
												>
													{!!field.value && (
														<IconRendererLucide
															className="size-4 text-zinc-500"
															icon={field.value}
														/>
													)}
													Select Icon
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											onWheel={(e) => e.stopPropagation()} // Fix issue mentioned in https://github.com/radix-ui/primitives/issues/1159#issuecomment-2403909634
											onTouchMove={(e) => e.stopPropagation()} // Fix issue mentioned in https://github.com/radix-ui/primitives/issues/1159#issuecomment-2403909634
											className="w-[300px] p-0"
										>
											<Command>
												<CommandInput placeholder="Search icon..." />
												<CommandList>
													<CommandEmpty>No icon found</CommandEmpty>
													<CommandGroup>
														{icons.map(({ name, Component, friendly_name }) => (
															<CommandItem
																key={name}
																value={friendly_name}
																onSelect={() => {
																	form.setValue("icon", name);
																}}
																className="flex items-center gap-x-2 truncate capitalize"
															>
																<Component />
																{friendly_name}
																<CheckIcon
																	data-selected={form.getValues("icon") == name}
																	className="ml-auto opacity-0 data-[selected=true]:opacity-100"
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>

									<FormMessage> </FormMessage>
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						type="submit"
						form="create-package-list-form"
						className="block ml-auto cursor-pointer"
					>
						Submit
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
