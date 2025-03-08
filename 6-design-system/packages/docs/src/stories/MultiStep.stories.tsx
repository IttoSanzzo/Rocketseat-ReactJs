import { StoryObj, Meta } from "@storybook/react";
import { Box, MultiStep, MultiStepProps } from "@ignite-ui/react";

export default {
	title: "Form/Multi Step",
	component: MultiStep,
	args: {
		size: 4,
		currentStep: 1,
	},
	decorators: [
		(Story) => {
			return (
				<Box
					as="label"
					css={{ display: "flex", flexDirection: "column", gap: "$2" }}>
					{Story()}
				</Box>
			);
		},
	],
} as Meta<MultiStepProps>;

type Story = StoryObj<MultiStepProps>;

export const Primary: Story = {};

export const Full: Story = {
	args: {
		currentStep: 4,
	},
};
