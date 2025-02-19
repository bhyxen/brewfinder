import GitHub from "next-auth/providers/github";

// Notice this is only an object, not a full Auth.js instance
// Fixed edge runtime error by following the guide here:
// https://authjs.dev/guides/edge-compatibility
export default {
	providers: [GitHub],
};
