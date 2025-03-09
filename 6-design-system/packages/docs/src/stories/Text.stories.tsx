import { StoryObj, Meta } from "@storybook/react";
import { Text, TextProps } from "@ignite-ui/react";
import { size } from "polished";

export default {
	title: "Typography/Text",
	component: Text,
	args: {
		children:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit delectus atque temporibus totam aliquam sequi tempora consectetur. Reiciendis eum velit harum mollitia earum, sapiente iure quam cumque repudiandae beatae nisi!",
		size: "md",
	},
	argTypes: {
		size: {
			options: [
				"xxs",
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
				"2xl",
				"4xl",
				"5xl",
				"6xl",
				"7xl",
				"8xl",
				"9xl",
			],
			control: {
				type: "inline-radio",
			},
		},
	},
} as Meta<TextProps>;

type Story = StoryObj<TextProps>;

export const Primary: Story = {};

export const CustomTag: Story = {
	args: {
		children: "Strong text",
		as: "strong",
	},
};
