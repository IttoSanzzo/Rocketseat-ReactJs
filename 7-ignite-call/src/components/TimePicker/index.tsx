import { Text } from "../DesignSystem/Text";
import { TimePickerContainer } from "./styledComponents";

interface timePickerProps {
	disabled?: boolean;
}

export default function TimePicker({
	disabled = false,
	...props
}: timePickerProps) {
	return (
		<TimePickerContainer>
			<input
				type="number"
				step={1}
				max={24}
				defaultValue={24}
				disabled={disabled}
				{...props}
			/>
			{disabled ? (
				<Text style={{ opacity: 0.5 }}>:00h</Text>
			) : (
				<Text>:00h</Text>
			)}
		</TimePickerContainer>
	);
}
