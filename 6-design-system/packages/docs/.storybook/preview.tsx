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

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo"
        }
    },

    tags: ["autodocs"]
};

export default preview;
