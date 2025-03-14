"use client";

import { ReactNode } from "react";
import * as DesignSystem from "@ignite-ui/react";

interface CheckboxProps extends DesignSystem.CheckboxProps {
	checked?: boolean;
	onCheckedChange?: (checked: any) => void;
}

export const Checkbox = ({ ...props }: CheckboxProps) => {
	return <DesignSystem.Checkbox {...props} />;
};
