import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackageCaveatsProps {
	caveats: string;
}

export function PackageCaveats({ caveats }: PackageCaveatsProps) {
	return (
		<Card className="border-amber-500/30 overflow-clip">
			<CardHeader className="bg-primary/20 not-dark:bg-primary/30">
				<CardTitle>Caveats</CardTitle>
			</CardHeader>
			<CardContent className="bg-primary/20 not-dark:bg-primary/30">
				<pre className="whitespace-pre-wrap text-sm">{caveats}</pre>
			</CardContent>
		</Card>
	);
}
