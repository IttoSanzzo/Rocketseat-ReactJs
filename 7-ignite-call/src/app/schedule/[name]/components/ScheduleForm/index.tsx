import { useState } from "react";
import CalendarStep from "./CalendarStep";
import ConfirmStep from "./ConfirmStep";
import { ScheduleFormContainer } from "./styledComponents";

export default function ScheduleForm() {
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

	function handleClearSelectedDateTime() {
		setSelectedDateTime(null);
	}

	if (!!selectedDateTime)
		return (
			<ScheduleFormContainer>
				<ConfirmStep
					schedulingDate={selectedDateTime}
					onCancelConfirmation={handleClearSelectedDateTime}
				/>
			</ScheduleFormContainer>
		);
	return (
		<ScheduleFormContainer>
			<CalendarStep onSelectDateTime={setSelectedDateTime} />
		</ScheduleFormContainer>
	);
}
