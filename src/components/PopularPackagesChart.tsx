"use client";

import { PackageAnalytics } from "@/types/homebrew";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useRouter } from "next/navigation";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "./ui/chart";
import { DownloadCloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PopularPackagesChartProps {
	data: PackageAnalytics["items"];
	chartHeader: string;
}
const chartConfig = {
	cask: {
		label: "Cask Installations",
		icon: DownloadCloud,
		theme: {
			light: "hsl(var(--chart-1))",
			dark: "hsl(var(--chart-1))",
		},
	},
	formula: {
		label: "Formula Installations",
		icon: DownloadCloud,
		theme: {
			light: "hsl(var(--chart-1))",
			dark: "hsl(var(--chart-1))",
		},
	},
} satisfies ChartConfig;

export function PopularPackagesChart({
	data,
	chartHeader,
}: PopularPackagesChartProps) {
	const packageType = "cask" in data[0] ? "cask" : "formula";

	const router = useRouter();

	const formattedData = data.map((item) => ({
		name: "cask" in item ? item.cask : item.formula,
		cask: "cask" in item ? parseFloat(item.count.replace(/,/g, "")) : 0,
		formula:
			"formula" in item ? parseFloat(item.count.replace(/,/g, "")) : 0,
		percentage: item.percent,
	}));

	const handleClick = (data: (typeof formattedData)[0]) => {
		router.push(`/packages/${data.name}?type=${packageType}`);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{chartHeader}</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={formattedData}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis
							dataKey="name"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<YAxis
							tickFormatter={(value) =>
								value % 1 === 0
									? value.toLocaleString()
									: value.toFixed(2)
							}
						/>

						<ChartTooltip
							content={<ChartTooltipContent />}
							formatter={(value, _, item) => {
								return (
									value.toLocaleString(undefined, {
										minimumFractionDigits: 0,
										maximumFractionDigits: 2,
									}) +
									" (" +
									item.payload.percentage +
									"%)"
								);
							}}
						/>
						<ChartLegend
							content={
								<ChartLegendContent accessKey={packageType} />
							}
						/>
						<Bar
							dataKey={packageType}
							fill={`var(--color-${packageType})`}
							radius={4}
							onClick={handleClick}
							className="cursor-pointer"
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
