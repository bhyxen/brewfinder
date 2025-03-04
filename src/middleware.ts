import authConfig, { privateRoutes } from "@/lib/auth.config";
import NextAuth from "next-auth";

// The following example avoids running the middleware on paths such as the favicon or static images.

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
	console.log({ pathname: req.nextUrl.pathname });

	const isLoggedIn = !!req.auth;

	if (!isLoggedIn && privateRoutes.includes(req.nextUrl.pathname)) {
		const newUrl = new URL("/sign-in", req.nextUrl.origin);
		return Response.redirect(newUrl);
	} else {
		console.log("User is authenticated");
	}
});
