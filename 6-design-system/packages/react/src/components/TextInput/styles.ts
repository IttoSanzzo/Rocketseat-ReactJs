import { styled } from "@/styles";

export const TextInputContainer = styled("div", {
	backgroundColor: "$gray900",
	padding: "$3 $4",
	borderRadius: "$sm",
	boxSizing: "border-box",
	border: "2px solid $gray900",
	display: "flex",
	alignItems: "baseline",

	"&:has(input:focus)": {
		borderColor: "$gray300",
	},
	"&:has(input:disabled)": {
		opacity: 0.5,
		cursor: "not-allowed",
	},
});
TextInputContainer.displayName = "TextInputContainer";

export const Prefix = styled("span", {
	fontFamily: "$default",
	fontSize: "$sm",
	color: "$gray400",
	fontWeight: "$regular",
});

Prefix.displayName = "Prefix";

export const Input = styled("input", {
	fontFamily: "$default",
	fontSize: "$sm",
	color: "$white",
	fontWeight: "$regular",
	background: "transparent",
	border: 0,
	width: "100%",

	"&:focus": {
		outline: 0,
	},
	"&:disabled": {
		cursor: "not-allowed",
	},
	"&:placeholder": {
		color: "$gray400",
	},
});

Input.displayName = "Input";
