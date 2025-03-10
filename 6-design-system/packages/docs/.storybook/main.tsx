import type { StorybookConfig } from "@storybook/react-vite";

import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
	stories: ["../src/pages/**/*.mdx", "../src/stories/**/*.stories.tsx"],

	addons: [
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/experimental-addon-test"),
        getAbsolutePath("@storybook/addon-mdx-gfm"),
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("@storybook/addon-mdx-gfm")
    ],

	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},

	core: {
		disableTelemetry: true,
	},

	previewHead: (head) => `
		${head}
		<link rel="preconnect" href="https://fonts.googleapis.com />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
	`,

	docs: {},
};
export default config;
