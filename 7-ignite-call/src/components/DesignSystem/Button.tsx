"use client";

import { ReactNode } from "react";
import * as DesignSystem from "@ignite-ui/react";

export const Button = ({ children, ...props }: any) => {
	return <DesignSystem.Button {...props}>{children}</DesignSystem.Button>;
};
