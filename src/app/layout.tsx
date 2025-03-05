import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Brewfinder - Homebrew Package Explorer",
	description: "Discover, save, and install Homebrew packages with ease",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-[url(/pattern-randomized.svg)] not-dark:bg-[url(/pattern-randomized.svg)] bg-cover relative overflow-y-auto antialiased min-h-screen flex flex-col `}
			>
				<SessionWrapper>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<SidebarProvider className="flex flex-col">
							<Header />
							<AppSidebar className="md:hidden" />
							<main className="container mx-auto px-4 py-8 grow flex flex-col w-screen">
								{/* <SidebarTrigger /> */}
								{children}
								<Toaster />
							</main>
							<Footer />
						</SidebarProvider>
					</ThemeProvider>
				</SessionWrapper>
			</body>
		</html>
	);
}
