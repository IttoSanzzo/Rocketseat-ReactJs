import type { Preview } from "@storybook/react";
import React from "react";
import "../styles/global.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "gray",
			values: [{ name: "gray", value: "#202024" }],
		},
	},
};

export default preview;
