"use client";

import { ReactNode } from "react";
import * as DesignSystem from "@ignite-ui/react";

interface TextProps extends DesignSystem.TextProps {
	children?: ReactNode;
	size?:
		| "xxs"
		| "xs"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "4xl"
		| "5xl"
		| "6xl"
		| "7xl"
		| "8xl"
		| "9xl";
}

export const Text = ({ children, ...props }: TextProps) => {
	return <DesignSystem.Text {...props}>{children}</DesignSystem.Text>;
};
