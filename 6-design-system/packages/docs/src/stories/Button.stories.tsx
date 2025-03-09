import { StoryObj, Meta } from "@storybook/react";
import { Button, ButtonProps } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

export default {
	title: "Form/Button",
	component: Button,
	args: {
		children: "Send",
		variant: "primary",
		size: "md",
		disabled: false,
	},
	argTypes: {
		variant: {
			options: ["primary", "secondary", "tertiary"],
			control: {
				type: "inline-radio",
			},
		},
		size: {
			options: ["sm", "md"],
			control: {
				type: "inline-radio",
			},
		},
		disabled: {
			options: ["true", "false"],
			control: {
				type: "boolean",
			},
		},
		onClick: {
			action: "click",
		},
	},
} as Meta<ButtonProps>;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {};
export const Secondary: Story = {
	args: {
		children: "Create New",
		variant: "secondary",
	},
};
export const Tertiary: Story = {
	args: {
		variant: "tertiary",
		children: "Cancel",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				Proximo Passo
				<ArrowRight weight="bold" />
			</>
		),
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
