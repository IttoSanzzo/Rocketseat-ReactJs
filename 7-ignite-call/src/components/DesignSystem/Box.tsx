"use client";

import { ReactNode } from "react";
import * as DesignSystem from "@ignite-ui/react";

interface BoxProps extends DesignSystem.BoxProps {
	children?: ReactNode;
}

export const Box = ({ children, ...props }: BoxProps) => {
	return <DesignSystem.Box {...props}>{children}</DesignSystem.Box>;
};
