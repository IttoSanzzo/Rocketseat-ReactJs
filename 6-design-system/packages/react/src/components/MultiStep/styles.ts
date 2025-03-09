import { styled } from "@/styles";
import { Text } from "../Text";

export const MultiStepContainer = styled("div", {});

export const Label = styled(Text, {
	color: "$gray200",

	defaultVariants: {
		size: "xs",
	},
});

Label.displayName = "Label";

export const Steps = styled("div", {
	marginTop: "$1",
	gridTemplateColumns: "repeat(var(--steps-size), 1fr)",
	display: "grid",
	gap: "$2",
});

Steps.displayName = "Steps";

export const Step = styled("div", {
	height: "$1",
	borderRadius: "$px",
	backgroundColor: "$gray600",

	variants: {
		active: {
			true: {
				backgroundColor: "$gray100",
			},
		},
	},
});

Step.displayName = "Step";
