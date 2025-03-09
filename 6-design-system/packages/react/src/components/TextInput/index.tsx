import { ComponentProps } from "@stitches/react";
import { TextInputContainer, Prefix, Input } from "./styles";

export interface TextInputProps extends ComponentProps<typeof Input> {
	prefix?: string;
	disabled?: true | false;
	placeholder: string;
}

export function TextInput({ prefix, ...props }: TextInputProps) {
	return (
		<TextInputContainer>
			{!!prefix && <Prefix>{prefix}</Prefix>}
			<Input {...props} />
		</TextInputContainer>
	);
}

TextInput.displayName = "TextInput";
