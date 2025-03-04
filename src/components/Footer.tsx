import Link from "next/link";
import { Beer, HeartHandshake } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Separator } from "./ui/separator";
import { GITHUB_URL, PAYPAL_URL, X_URL } from "@/lib/constants";

export default function Footer() {
	return (
		<footer className="border-t bg-secondary text-secondary-foreground">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<Link href="/" className="flex items-center space-x-2">
							<Beer className="h-6 w-6" />
							<span className="text-xl font-bold">
								Brewfinder
							</span>
						</Link>
						<p className="text-sm">
							Discover, save, and install Homebrew packages with
							ease.
						</p>
						<div className="flex space-x-4">
							<Link href={GITHUB_URL} target="_blank">
								<SiGithub />
							</Link>
							<Link href={PAYPAL_URL} target="_blank">
								<HeartHandshake />
							</Link>
							<Link href={X_URL} target="_blank">
								<SiX />
							</Link>
						</div>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-sm hover:underline"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/packages"
									className="text-sm hover:underline"
								>
									Packages
								</Link>
							</li>
							<li>
								<Link
									href="/my-lists"
									className="text-sm hover:underline"
								>
									My Lists
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Resources</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href={PAYPAL_URL}
									className="text-sm hover:underline"
								>
									Support Brewfinder
								</Link>
							</li>
							<li>
								<Link
									href={GITHUB_URL}
									className="text-sm hover:underline"
								>
									GitHub
								</Link>
							</li>
							<li>
								<Link
									href={X_URL}
									className="text-sm hover:underline"
								>
									X
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Legal</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/terms"
									className="text-sm hover:underline"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-sm hover:underline"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<Separator className="my-4" />
				<div className="text-center text-sm text-muted-foreground">
					© {new Date().getFullYear()} Brewfinder. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
}
