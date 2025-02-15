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
import { Star } from "lucide-react";

interface PopularPackagesChartProps {
	data: PackageAnalytics["items"];
}
const chartConfig = {
	popularity: {
		label: "Total Installations",
		icon: Star,
		theme: {
			light: "hsl(var(--chart-1))",
			dark: "hsl(var(--chart-1))",
		},
	},
} satisfies ChartConfig;

export function PopularPackagesChart({ data }: PopularPackagesChartProps) {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={(value) => {
						return "cask" in value ? value.cask : value.formula;
					}}
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value.toLocaleString()}`}
				/>
				<Bar
					dataKey={(value) => parseInt(value.count)}
					fill="var(--primary)"
					radius={[4, 4, 0, 0]}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />

				<ChartLegend
					content={<ChartLegendContent content="dasda" nameKey="perecent" />}
				/>
			</BarChart>
		</ChartContainer>
	);
}
