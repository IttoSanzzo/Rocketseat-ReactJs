import dayjs from "dayjs";
import { Text } from "../../DesignSystem/Text";
import {
	CalendarTimePickerHeader,
	CalendarTimePickerItem,
	CalendarTimePickerList,
	CalendarTimePickersContainer,
} from "./styledComponents";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import { date } from "zod";
import { useQuery } from "@tanstack/react-query";

interface calendarTimePickersProps {
	selectedDate: Date | null;
	onSelectDateTime: (date: Date) => void;
}

interface availability {
	possibleTimes: number[];
	availableTimes: number[];
}

export default function CalendarTimePickers({
	selectedDate,
	onSelectDateTime,
}: calendarTimePickersProps) {
	const params = useParams();
	const username = params.name;

	const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
	const describedDate = selectedDate
		? dayjs(selectedDate).format("DD[ de ]MMMM")
		: null;

	const selectedDateWithoutTime = selectedDate
		? dayjs(selectedDate).format("YYYY-MM-DD")
		: null;

	const { data: availability } = useQuery<availability>({
		queryKey: ["availability", selectedDateWithoutTime],
		queryFn: async () => {
			const response = await api.get(`/users/${username}/availability`, {
				params: {
					date: selectedDateWithoutTime,
				},
			});
			return response.data;
		},
		enabled: !!selectedDate,
	});

	function handleSelectTime(hour: number) {
		const dateWithTime = dayjs(selectedDate)
			.set("hour", hour)
			.startOf("hour")
			.toDate();

		onSelectDateTime(dateWithTime);
	}

	return (
		<CalendarTimePickersContainer>
			<CalendarTimePickerHeader>
				<Text>
					{weekDay} <span>{describedDate}</span>
				</Text>
			</CalendarTimePickerHeader>
			<CalendarTimePickerList>
				{availability?.possibleTimes.map((hour) => (
					<CalendarTimePickerItem
						key={hour}
						onClick={() => handleSelectTime(hour)}
						disabled={!availability.availableTimes.includes(hour)}>
						{String(hour).padStart(2, "0")}:00h
					</CalendarTimePickerItem>
				))}
			</CalendarTimePickerList>
		</CalendarTimePickersContainer>
	);
}
