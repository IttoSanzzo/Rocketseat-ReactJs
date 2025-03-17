"use client";

import { CaretLeft, CaretRight } from "phosphor-react";
import {
	CalendarActions,
	CalendarBody,
	CalendarContainer,
	CalendarDay,
	CalendarHeader,
	CalendarTitle,
} from "./styledComponents";
import { getWeekDays } from "@/lib/utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface CalendarWeek {
	week: number;
	days: Array<{
		date: dayjs.Dayjs;
		disabled: boolean;
	}>;
}
interface CalendarProps {
	selectedDate: Date | null;
	onDateSelected: (date: Date) => void;
}
interface BlockedDates {
	blockedWeekDays: number[];
	blockedDatesRaw: any;
}

export default function Calendar({
	selectedDate,
	onDateSelected,
}: CalendarProps) {
	const params = useParams();
	const username = params.name;

	const shortWeekDays = getWeekDays({ short: true });
	const [currentDate, setCurrentDate] = useState(() => {
		return dayjs().set("date", 1);
	});
	const currentMonth = currentDate.format("MMMM");
	const currentYear = currentDate.format("YYYY");

	const { data: blockedDates } = useQuery<BlockedDates>({
		queryKey: [
			"blocked-dates",
			currentDate.get("year"),
			currentDate.get("month"),
		],
		queryFn: async () => {
			const response = await api.get(`/users/${username}/blocked-dates`, {
				params: {
					year: currentDate.get("year"),
					month: currentDate.get("month"),
				},
			});
			return response.data;
		},
	});
	console.log(blockedDates?.blockedDatesRaw);

	const calendarWeeks = useMemo(() => {
		if (!blockedDates) return [];

		const daysInMonthArray = Array.from({
			length: currentDate.daysInMonth(),
		}).map((_, index) => currentDate.set("date", index + 1));

		const firstWeekDayInMonth = currentDate.get("day");
		const previousMonthFillArray = Array.from({ length: firstWeekDayInMonth })
			.map((_, index) => currentDate.subtract(index + 1, "day"))
			.reverse();
		const lastDayInCurrentMonth = currentDate.set(
			"date",
			currentDate.daysInMonth()
		);
		const lastWeekDayInMonth = lastDayInCurrentMonth.get("day");
		const nextMonthFillArray = Array.from({
			length: 6 - lastWeekDayInMonth,
		}).map((_, index) => lastDayInCurrentMonth.add(index + 1, "day"));

		const calendarDays = [
			...previousMonthFillArray.map((date) => ({ date, disabled: true })),
			...daysInMonthArray.map((date) => ({
				date,
				disabled:
					date.endOf("day").isBefore(new Date()) ||
					blockedDates.blockedWeekDays.includes(date.get("day")),
			})),
			...nextMonthFillArray.map((date) => ({ date, disabled: true })),
		];

		const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
			(weeks, _, index, original) => {
				const isNewWeek = index % 7 === 0;
				if (isNewWeek) {
					weeks.push({
						week: index / 7 + 1,
						days: original.slice(index, index + 7),
					});
				}
				return weeks;
			},
			[]
		);

		return calendarWeeks;
	}, [currentDate, blockedDates]);

	function handlePreviousMonth() {
		const previousMonthDate = currentDate.subtract(1, "month");
		setCurrentDate(previousMonthDate);
	}
	function handleNextMonth() {
		const nextMonthDate = currentDate.add(1, "month");
		setCurrentDate(nextMonthDate);
	}

	return (
		<CalendarContainer>
			<CalendarHeader>
				<CalendarTitle>
					{currentMonth} <span>{currentYear}</span>
				</CalendarTitle>
				<CalendarActions>
					<button
						onClick={handlePreviousMonth}
						title="Previous Month">
						<CaretLeft />
					</button>
					<button
						onClick={handleNextMonth}
						title="Next Month">
						<CaretRight />
					</button>
				</CalendarActions>
			</CalendarHeader>
			<CalendarBody>
				<thead>
					<tr>
						{shortWeekDays.map((day, index) => {
							return <th key={index}>{day}.</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{calendarWeeks.map((week) => {
						return (
							<tr key={week.week}>
								{week.days.map(({ date, disabled }, index) => {
									return (
										<td key={index}>
											<CalendarDay
												disabled={disabled}
												onClick={() => onDateSelected(date.toDate())}>
												{date.get("date")}
											</CalendarDay>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</CalendarBody>
		</CalendarContainer>
	);
}
