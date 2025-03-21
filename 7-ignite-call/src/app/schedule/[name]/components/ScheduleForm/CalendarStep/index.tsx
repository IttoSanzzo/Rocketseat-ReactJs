"use client";

import { Box } from "@/components/DesignSystem/Box";
import Calendar from "@/components/Calendar";
import CalendarTimePickers from "@/components/Calendar/CalendarTimePickers";
import { CalendarStepContainer } from "./styledComponents";
import { resolveVariants } from "@/../libs/createComponents/utils";
import styles from "./styles.module.css";
import { useState } from "react";

interface CalendarStepProps {
	onSelectDateTime: (date: Date) => void;
}

export default function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const isDateSelected = !!selectedDate;

	const calendarVariants = resolveVariants(styles, {
		isOpen: isDateSelected,
	});

	return (
		<CalendarStepContainer className={calendarVariants}>
			<Box>
				<Calendar
					selectedDate={selectedDate}
					onDateSelected={setSelectedDate}
				/>
				{isDateSelected && (
					<CalendarTimePickers
						selectedDate={selectedDate}
						onSelectDateTime={onSelectDateTime}
					/>
				)}
			</Box>
		</CalendarStepContainer>
	);
}
