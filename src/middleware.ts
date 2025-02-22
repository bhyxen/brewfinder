import authConfig, { openRoutes } from "@/lib/auth.config";
import NextAuth from "next-auth";

// The following example avoids running the middleware on paths such as the favicon or static images.

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
	if (!req.auth && !openRoutes.includes(req.nextUrl.pathname)) {
		const newUrl = new URL("/sign-in", req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
});
