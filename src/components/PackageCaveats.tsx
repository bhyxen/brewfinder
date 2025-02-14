import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackageCaveatsProps {
	caveats: string;
}

export function PackageCaveats({ caveats }: PackageCaveatsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Caveats</CardTitle>
			</CardHeader>
			<CardContent>
				<pre className="whitespace-pre-wrap text-sm">{caveats}</pre>
			</CardContent>
		</Card>
	);
}
