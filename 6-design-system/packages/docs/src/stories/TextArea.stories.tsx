import { StoryObj, Meta } from "@storybook/react";
import { Box, Text, TextArea, TextAreaProps } from "@ignite-ui/react";

export default {
	title: "Form/Text Area",
	component: TextArea,
	decorators: [
		(Story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "column", gap: "$2" }}>
					<Text size="sm">Observations</Text>
					{Story()}
				</Box>
			);
		},
	],
} as Meta<TextAreaProps>;

type Story = StoryObj<TextAreaProps>;

export const Primary: Story = {
	args: {
		placeholder: "Type any observations",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
