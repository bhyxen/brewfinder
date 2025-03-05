import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		// TODO: Remove this option before building for production.
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
