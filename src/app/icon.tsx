import { ImageResponse } from "next/og";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					height: "100%",
					width: "100%",
					fontSize: 24,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "hsl(48 100% 50%)",
					borderRadius: "6px",
				}}
			>
				<svg
					style={{
						height: "100%",
						width: "100%",
						padding: "2px",
					}}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M17 11h1a3 3 0 0 1 0 6h-1"></path>
					<path d="M9 12v6"></path>
					<path d="M13 12v6"></path>
					<path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"></path>
					<path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"></path>
				</svg>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	);
}
