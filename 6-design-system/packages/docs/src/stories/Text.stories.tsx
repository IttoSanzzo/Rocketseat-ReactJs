import { StoryObj, Meta } from "@storybook/react";
import { Text, TextProps } from "@ignite-ui/react";

export default {
	title: "Typography/Text",
	component: Text,
	args: {
		children:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit delectus atque temporibus totam aliquam sequi tempora consectetur. Reiciendis eum velit harum mollitia earum, sapiente iure quam cumque repudiandae beatae nisi!",
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
