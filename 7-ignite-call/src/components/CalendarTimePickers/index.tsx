import { Text } from "../DesignSystem/Text";
import {
	CalendarTimePickerHeader,
	CalendarTimePickerItem,
	CalendarTimePickerList,
	CalendarTimePickersContainer,
} from "./styledComponents";

export default function CalendarTimePickers() {
	return (
		<CalendarTimePickersContainer>
			<CalendarTimePickerHeader>
				<Text>
					terça-feira <span>20 de setembro</span>
				</Text>
			</CalendarTimePickerHeader>
			<CalendarTimePickerList>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
				<CalendarTimePickerItem>08:00h</CalendarTimePickerItem>
			</CalendarTimePickerList>
		</CalendarTimePickersContainer>
	);
}
