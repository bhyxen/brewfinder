import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, Gift, CreditCard, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { DONATIONS_URL, GITHUB_SPONSOR_URL, GITHUB_URL } from "@/lib/constants";

export default function SupportPage() {
	return (
		<div>
			<div className="max-w-3xl mx-auto">
				<div className="text-center flex items-center justify-center flex-col mb-8">
					<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900 mb-4">
						<Heart className="h-6 w-6 text-rose-500" />
					</div>
					<h1 className="text-3xl font-bold inline-block bg-background">
						Support Brewfinder
					</h1>
					<p className="text-muted-foreground mt-2 max-w-xl mx-auto">
						Brewfinder is an open-source project developed by a
						single developer open to receive support from
						volunteers. Your support helps the project continue the
						development and cover hosting and operations costs.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<Coffee className="mr-2 h-5 w-5" />
								Buy me a coffee
							</CardTitle>
							<CardDescription>
								Support the development with a one-time or
								monthly donation.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="mb-4 text-sm text-muted-foreground">
								Every contribution helps, no matter how small.
								Your support motivates to keep improving
								Brewfinder.
							</p>
							<Button asChild className="w-full">
								<Link
									href={DONATIONS_URL}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Coffee className="mr-2 h-4 w-4" />
									Buy me a coffee
								</Link>
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<Gift className="mr-2 h-5 w-5" />
								Become a sponsor
							</CardTitle>
							<CardDescription>
								Support the development with a one-time or
								monthly donation.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="mb-4 text-sm text-muted-foreground">
								Recurring donations help to plan for the future
								and dedicate more time to Brewfinder&#39;s
								development.
							</p>
							<Button asChild className="w-full ">
								<Link
									href={GITHUB_SPONSOR_URL}
									target="_blank"
									rel="noopener noreferrer"
								>
									<SiGithub className="mr-2 h-4 w-4" />
									Sponsor on GitHub
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center">
							<CreditCard className="mr-2 h-5 w-5" />
							Other ways to support
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4">
							<li className="flex">
								<SiGithub className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
								<div>
									<h3 className="font-medium">
										Contribute to the code
									</h3>
									<p className="text-sm text-muted-foreground">
										Help us improve Brewfinder by
										contributing code, fixing bugs, or
										improving documentation.
									</p>
									<Link
										href={GITHUB_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm inline-flex items-center underline decoration-primary not-dark:decoration-foreground decoration-2 decoration-dashed hover:decoration-solid text-primary hover:underline-solid not-dark:text-secondary-foreground"
									>
										View the GitHub repository
										<ArrowUpRight className="ml-1 h-4 w-4" />
									</Link>
								</div>
							</li>
							<li className="flex">
								<Heart className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
								<div>
									<h3 className="font-medium">
										Spread the word
									</h3>
									<p className="text-sm text-muted-foreground">
										Share Brewfinder with your friends and
										colleagues. The more users we have, the
										better the project becomes.
									</p>
								</div>
							</li>
							<li className="flex">
								<Coffee className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
								<div>
									<h3 className="font-medium">
										Report issues and suggest features
									</h3>
									<p className="text-sm text-muted-foreground">
										Help us improve by reporting bugs and
										suggesting new features.
									</p>
									<Link
										href={`${GITHUB_URL}/issues/new/choose`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm inline-flex items-center underline decoration-primary not-dark:decoration-foreground decoration-2 decoration-dashed hover:decoration-solid text-primary hover:underline-solid not-dark:text-secondary-foreground"
									>
										Submit feedback
										<ArrowUpRight className="ml-1 h-4 w-4" />
									</Link>
								</div>
							</li>
						</ul>
					</CardContent>
				</Card>

				<div className="flex flex-col justify-center items-center">
					<h2 className="text-xl font-semibold mb-4 inline-block bg-background">
						Our Sponsors
					</h2>
					{/*<p className="text-muted-foreground mb-6">
						We&#39;re grateful to the following sponsors for their
						support:
					</p>
					<div className="flex flex-wrap justify-center gap-6 mb-8">
						<div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
							<span className="text-muted-foreground text-xs">
								Your logo here
							</span>
						</div>
						<div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
							<span className="text-muted-foreground text-xs">
								Your logo here
							</span>
						</div>
						<div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
							<span className="text-muted-foreground text-xs">
								Your logo here
							</span>
						</div>
					</div>*/}
					<p className="text-sm text-muted-foreground mb-8 inline-block bg-background">
						Become a sponsor to have your logo displayed here.
					</p>
				</div>
			</div>
		</div>
	);
}
