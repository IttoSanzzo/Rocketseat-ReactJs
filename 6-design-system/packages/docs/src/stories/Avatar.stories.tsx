import { StoryObj, Meta } from "@storybook/react";
import { Avatar, AvatarProps } from "@ignite-ui/react";

export default {
	title: "Data Display/Avatar",
	component: Avatar,
	args: {
		src: "https://github.com/ittosanzzo.png",
	},
	argTypes: {
		src: {
			control: {
				type: "text",
			},
		},
	},
} as Meta<AvatarProps>;

type Story = StoryObj<AvatarProps>;

export const Primary: Story = {};

export const WithFallback: Story = {
	args: {
		src: undefined,
	},
};
