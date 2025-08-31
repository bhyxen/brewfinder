import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	CheckCircle2,
	Clock,
	Lightbulb,
	ArrowUpRight,
	CheckCircle,
	Pickaxe,
	Construction,
} from "lucide-react";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";

interface RoadmapItem {
	title: string;
	description: string;
	status: "planned" | "in-progress" | "completed";
	eta?: string;
}

export default function RoadmapPage() {
	/*const comingSoonFeatures: RoadmapItem[] = [
		{
			title: "",
			description: "",
			status: "",
			eta: "",
		},
	];*/

	const inDevelopmentFeatures: RoadmapItem[] = [
		{
			title: "Import/Export to Brewfile",
			description:
				"Import your existing Brewfile or export your lists to a Brewfile format for easy setup on new machines.",
			status: "in-progress",
			eta: "Q2 2025",
		},
		{
			title: "Private List Sharing Links",
			description:
				"Generate unique, secure links to share your private lists with specific individuals without making them public.",
			status: "in-progress",
			eta: "Q2 2025",
		},
		{
			title: "List Templates",
			description:
				"Create and share templates for common development environments and setups.",
			status: "in-progress",
			eta: "Q3 2025",
		},
	];

	const futurePlansFeatures: RoadmapItem[] = [
		{
			title: "Package Reviews and Ratings",
			description:
				"Read and write reviews for packages to help others make informed decisions.",
			status: "planned",
			eta: "Q4 2025",
		},
		{
			title: "Team Collaboration",
			description:
				"Collaborate with team members on shared lists with role-based permissions.",
			status: "planned",
			eta: "Q4 2025",
		},
		{
			title: "Package Update Notifications",
			description:
				"Receive notifications when packages in your lists have updates available.",
			status: "planned",
			eta: "Q3 2025",
		},
	];

	const completedFeatures: RoadmapItem[] = [
		{
			title: "Package Search",
			description:
				"Search for Homebrew packages by name, description, or category.",
			status: "completed",
		},
		{
			title: "List Creation",
			description:
				"Create and manage lists of Homebrew packages for different purposes.",
			status: "completed",
		},
		{
			title: "Basic Installation Scripts",
			description:
				"Generate basic installation scripts for your package lists.",
			status: "completed",
		},
		{
			title: "Public List Sharing",
			description:
				"Share your lists publicly with the Brewfinder community.",
			status: "completed",
		},
	];

	const renderFeatureCard = (feature: RoadmapItem) => {
		const statusColors = {
			planned: (
				<Badge variant="secondary" className="ml-2 bg-blue-300">
					<Construction className="text-secondary not-dark:text-secondary-foreground" />
				</Badge>
			),
			"in-progress": (
				<Badge variant="secondary" className="ml-2 bg-yellow-500">
					<Pickaxe className="text-secondary not-dark:text-secondary-foreground" />
				</Badge>
			),
			completed: (
				<Badge variant="secondary" className="ml-2 bg-green-500">
					<CheckCircle className="text-secondary not-dark:text-secondary-foreground" />
				</Badge>
			),
		};

		return (
			<Card key={feature.title} className="mb-4">
				<CardHeader>
					<CardTitle className="flex items-center">
						{feature.title}
						{statusColors[feature.status]}
					</CardTitle>
					{feature.eta && (
						<CardDescription>
							Expected: {feature.eta}
						</CardDescription>
					)}
				</CardHeader>
				<CardContent>
					<p>{feature.description}</p>
				</CardContent>
			</Card>
		);
	};

	return (
		<div className="mx-auto pb-8">
			<div className="flex flex-col justify-center items-center mb-12">
				<h1 className="text-4xl font-bold mb-4 inline-block bg-background">
					Feature Roadmap
				</h1>
				<p className="text-xl text-muted-foreground inline-block bg-background">
					Our plans for the future of Brewfinder
				</p>
			</div>

			<div className="max-w-4xl mx-auto">
				<Tabs defaultValue="in-development">
					<TabsList className="w-full flex mb-8">
						{/*<TabsTrigger
							value="coming-soon"
							className="flex grow items-center cursor-pointer"
						>
							<Rocket className="mr-2 h-4 w-4" />
							<span className="hidden sm:inline">
								Coming Soon
							</span>
							<span className="sm:hidden">Soon</span>
						</TabsTrigger>*/}
						<TabsTrigger
							value="in-development"
							className="flex grow items-center cursor-pointer"
						>
							<Clock className="mr-2 h-4 w-4" />
							<span className="hidden sm:inline">
								In Development
							</span>
							<span className="sm:hidden">Dev</span>
						</TabsTrigger>
						<TabsTrigger
							value="future-plans"
							className="flex grow items-center cursor-pointer"
						>
							<Lightbulb className="mr-2 h-4 w-4" />
							<span className="hidden sm:inline">
								Future Plans
							</span>
							<span className="sm:hidden">Future</span>
						</TabsTrigger>
						<TabsTrigger
							value="completed"
							className="flex grow items-center cursor-pointer"
						>
							<CheckCircle2 className="mr-2 h-4 w-4" />
							<span className="hidden sm:inline">Completed</span>
							<span className="sm:hidden">Done</span>
						</TabsTrigger>
					</TabsList>

					{/*<TabsContent value="coming-soon">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-semibold inline-block bg-background">
									Coming Soon
								</h2>
								<Badge variant="outline" className="text-sm">
									Q2 2025
								</Badge>
							</div>
							<p className="text-muted-foreground mb-6">
								Features that are currently in active
								development and will be released soon.
							</p>
							{comingSoonFeatures.map(renderFeatureCard)}
						</div>
					</TabsContent>*/}

					<TabsContent value="in-development">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-semibold inline-block bg-background">
									In Development
								</h2>
								{/*	<Badge variant="outline" className="text-sm">
									Q3 2025
								</Badge>*/}
							</div>
							<p className="text-muted-foreground mb-6 inline-block bg-background">
								Features that are currently being designed and
								developed for future releases.
							</p>
							{inDevelopmentFeatures.map(renderFeatureCard)}
						</div>
					</TabsContent>

					<TabsContent value="future-plans">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-semibold inline-block bg-background">
									Future Plans
								</h2>
								{/*<Badge variant="outline" className="text-sm">
									Q4 2025 & Beyond
								</Badge>*/}
							</div>
							<p className="text-muted-foreground mb-6 inline-block bg-background">
								Features that are on our long-term roadmap and
								will be developed in the future.
							</p>
							{futurePlansFeatures.map(renderFeatureCard)}
						</div>
					</TabsContent>

					<TabsContent value="completed">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-semibold inline-block bg-background">
									Completed Features
								</h2>
								{/*<Badge variant="outline" className="text-sm">
									Already Available
								</Badge>*/}
							</div>
							<p className="text-muted-foreground mb-6 inline-block bg-background">
								Features that have already been implemented and
								are available in the current version.
							</p>
							{completedFeatures.map(renderFeatureCard)}
						</div>
					</TabsContent>
				</Tabs>

				<div className="mt-12 p-6 bg-muted/30 backdrop-blur-md rounded-lg">
					<h2 className="text-xl font-semibold mb-4">
						Have a Feature Request?
					</h2>
					<p className="mb-4">
						We&#39;re always looking for ways to improve Brewfinder.
						If you have a feature request or suggestion, we&#39;d
						love to hear from you!
					</p>
					<Link
						href={`${GITHUB_URL}/issues/new?template=feature_request.md`}
						rel="noopener noreferrer"
						target="_blank"
						className="inline-flex items-center underline decoration-primary not-dark:decoration-foreground decoration-2 decoration-solid text-primary hover:underline-solid not-dark:text-secondary-foreground"
					>
						Submit a feature request
						<ArrowUpRight className="ml-1 h-4 w-4" />
					</Link>
				</div>
			</div>
		</div>
	);
}
