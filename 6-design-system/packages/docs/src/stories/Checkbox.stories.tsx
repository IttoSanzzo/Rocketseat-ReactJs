import { StoryObj, Meta } from "@storybook/react";
import { Box, Text, Checkbox, CheckboxProps } from "@ignite-ui/react";

export default {
	title: "Form/Checkbox",
	component: Checkbox,
	decorators: [
		(Story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "row", gap: "$2" }}>
					{Story()}
					<Text size="sm">Accept terms of use</Text>
				</Box>
			);
		},
	],
} as Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

export const Primary: Story = {
	args: {
		placeholder: "Type any observations",
	},
};
