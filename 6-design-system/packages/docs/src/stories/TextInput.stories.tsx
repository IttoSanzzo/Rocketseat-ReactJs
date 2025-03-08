import { StoryObj, Meta } from "@storybook/react";
import { Box, Text, TextInput, TextInputProps } from "@ignite-ui/react";

export default {
	title: "Form/Text Input",
	component: TextInput,
	decorators: [
		(Story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "column", gap: "$2" }}>
					<Text size="sm">Email adress</Text>
					{Story()}
				</Box>
			);
		},
	],
} as Meta<TextInputProps>;

type Story = StoryObj<TextInputProps>;

export const Primary: Story = {
	args: {
		placeholder: "Type your email",
	},
};

export const WithPrefix: Story = {
	args: {
		prefix: "cal.com/",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
