import { CONTACT_EMAIL } from "@/lib/constants";
import Link from "next/link";

export default function TermsOfService() {
	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
			<p className="text-gray-600 mb-4">
				<strong>Last Updated: Wed Mar 05 2025</strong>
			</p>
			<p className="mb-6">
				Welcome to Brewfinder! By using our platform, you agree to these
				Terms of Service. Please read them carefully.
			</p>
			<h2 className="text-2xl font-semibold mb-3">
				1. Acceptance of Terms
			</h2>
			<p className="mb-6">
				By accessing or using Brewfinder, you agree to be bound by these
				Terms. If you do not agree, please do not use our platform.
			</p>
			<h2 className="text-2xl font-semibold mb-3">
				2. Use of the Platform
			</h2>
			<ul className="list-disc pl-5 mb-6">
				<li>
					Brewfinder provides information about Homebrew packages and
					facilitates their installation.
				</li>
				<li>
					You must use the platform in compliance with applicable laws
					and regulations.
				</li>
				<li>
					Unauthorized use, including attempts to disrupt the platform
					or exploit vulnerabilities, is prohibited.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
			<ul className="list-disc pl-5 mb-6">
				<li>
					If you create an account, you are responsible for
					maintaining its security.
				</li>
				<li>
					You must provide accurate information and not impersonate
					others.
				</li>
				<li>
					We reserve the right to suspend or terminate accounts that
					violate these Terms.
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-3">
				4. Intellectual Property
			</h2>
			<p className="mb-6">
				All content on Brewfinder, including text, logos, and design, is
				our property or licensed to us. You may not copy, modify, or
				distribute our content without permission.
			</p>
			<h2 className="text-2xl font-semibold mb-3">
				5. Disclaimer of Warranties
			</h2>
			<p className="mb-6">
				Brewfinder is provided &quot;as is&quot; without warranties of
				any kind. We do not guarantee that the platform will be
				error-free or uninterrupted.
			</p>
			<h2 className="text-2xl font-semibold mb-3">
				6. Limitation of Liability
			</h2>
			<p className="mb-6">
				We are not liable for any damages arising from the use of
				Brewfinder, including indirect, incidental, or consequential
				damages.
			</p>
			<h2 className="text-2xl font-semibold mb-3">
				7. No Association with Homebrew
			</h2>
			<p className="mb-6">
				Brewfinder is an independent platform and is not affiliated,
				associated, authorized, endorsed by, or in any way officially
				connected with Homebrew (
				<Link
					href="https://brew.sh/"
					className="text-primary underline decoration-solid decoration-2"
				>
					https://brew.sh/
				</Link>
				) or its developers.
			</p>
			<h2 className="text-2xl font-semibold mb-3">
				8. Changes to These Terms
			</h2>
			<p className="mb-6">
				We may update these Terms from time to time. Continued use of
				Brewfinder after changes constitutes acceptance of the updated
				Terms.
			</p>
			<h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
			<p>
				If you have any questions about these Terms, please contact us
				at{" "}
				<strong>
					<Link
						className="text-primary underline decoration-solid decoration-2"
						href={`mailto:${CONTACT_EMAIL}`}
					>
						{CONTACT_EMAIL}
					</Link>
				</strong>
				.
			</p>
		</div>
	);
}
