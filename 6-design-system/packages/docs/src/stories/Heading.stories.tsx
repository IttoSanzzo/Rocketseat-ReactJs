import { StoryObj, Meta } from "@storybook/react";
import { Heading, HeadingProps } from "@ignite-ui/react";

export default {
	title: "Typography/Heading",
	component: Heading,
	args: {
		children: "Custom Title",
		size: "md",
	},
	argTypes: {
		size: {
			options: ["sm", "md", "lg", "2xl", "4xl", "5xl", "6xl"],
			control: {
				type: "inline-radio",
			},
		},
	},
} as Meta<HeadingProps>;

type Story = StoryObj<HeadingProps>;

export const Primary: Story = {};

export const CustomTag: Story = {
	args: {
		children: "H1 Heading",
		as: "h1",
	},
	parameters: {
		docs: {
			description: {
				story:
					"By default, it will always be a h2, but can be changed to another hx using property `as`.",
			},
		},
	},
};
