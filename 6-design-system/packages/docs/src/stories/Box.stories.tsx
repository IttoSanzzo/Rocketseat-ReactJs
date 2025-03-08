import { StoryObj, Meta } from "@storybook/react";
import { Box, BoxProps, Text } from "@ignite-ui/react";

export default {
	title: "Form/Box",
	component: Box,
	args: {
		children: (
			<>
				<Text>Testando o elemento Box</Text>
			</>
		),
	},
} as Meta<BoxProps>;

type Story = StoryObj<BoxProps>;

export const Primary: Story = {};
