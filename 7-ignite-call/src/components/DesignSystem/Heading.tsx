"use client";

import { ReactNode } from "react";
import * as DesignSystem from "@ignite-ui/react";

interface HeadingProps extends DesignSystem.HeadingProps {
	children?: ReactNode;
	size?: "sm" | "md" | "lg" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
}

export const Heading = ({ children, ...props }: HeadingProps) => {
	return <DesignSystem.Heading {...props}>{children}</DesignSystem.Heading>;
};
