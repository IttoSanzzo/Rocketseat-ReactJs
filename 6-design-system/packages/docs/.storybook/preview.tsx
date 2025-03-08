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
			values: [{ name: "gray", value: "#292c2e" }],
		},
	},
};

export default preview;
