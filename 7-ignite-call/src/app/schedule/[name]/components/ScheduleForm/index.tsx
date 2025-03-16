import CalendarStep from "./CalendarStep";
import ConfirmStep from "./ConfirmStep";
import { ScheduleFormContainer } from "./styledComponents";

export default function ScheduleForm() {
	return (
		<ScheduleFormContainer>
			<CalendarStep />
			{/* <ConfirmStep /> */}
		</ScheduleFormContainer>
	);
}
