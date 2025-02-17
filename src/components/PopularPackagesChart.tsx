"use client";

import { PackageAnalytics } from "@/types/homebrew";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "./ui/chart";
import { DownloadCloud } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface PopularPackagesChartProps {
	data: PackageAnalytics["items"];
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

export function PopularPackagesChart({ data }: PopularPackagesChartProps) {
	const packageType = "cask" in data[0] ? "cask" : "formula";

	const formattedData = data.map((item) => ({
		name: "cask" in item ? item.cask : item.formula,
		cask: "cask" in item ? parseFloat(item.count.replace(/,/g, "")) : 0,
		formula: "formula" in item ? parseFloat(item.count.replace(/,/g, "")) : 0,
	}));

	return (
		<Card>
			<CardContent className="pt-6">
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
								value % 1 === 0 ? value.toLocaleString() : value.toFixed(2)
							}
						/>

						<ChartTooltip
							content={<ChartTooltipContent />}
							formatter={(value) =>
								value.toLocaleString(undefined, {
									minimumFractionDigits: 0,
									maximumFractionDigits: 2,
								})
							}
						/>
						<ChartLegend
							content={<ChartLegendContent accessKey={packageType} />}
						/>
						<Bar
							dataKey={packageType}
							fill={`var(--color-${packageType})`}
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
