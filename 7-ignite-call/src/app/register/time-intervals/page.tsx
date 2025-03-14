"use client";

import {
	TimeIntervalsContainer,
	Header,
	IntervalBox,
	IntervalsContainer,
	IntervalItem,
	IntervalDay,
	IntervalInput,
	FormError,
} from "./styledComponents";
import { Text } from "@/components/DesignSystem/Text";
import { Heading } from "@/components/DesignSystem/Heading";
import { MultiStep } from "@/components/DesignSystem/MultiStep";
import { Box } from "@/components/DesignSystem/Box";
import { Checkbox } from "@/components/DesignSystem/Checkbox";
import TimePicker from "@/components/TimePicker";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/lib/utils/get-week-days";
import { Button } from "@/components/DesignSystem/Button";
import { ArrowRight } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";

const timeIntervalsFormSchema = z.object(
	{
		intervals: z
			.array(
				z.object(
					{
						weekDay: z
							.number({
								message: "WeekDay not number",
							})
							.min(0, { message: "WeekDay Min Error" })
							.max(6, { message: "WeekDay Max Error" }),
						enabled: z.boolean({ message: "Enabled not boolean" }),
						startTime: z
							.string()
							.transform((val) => Number(val))
							.refine((val) => !isNaN(val), {
								message: "StartTime must be a number",
							})
							.refine((val) => val >= 0 && val <= 24, {
								message: "StartTime must be between 0 and 24",
							}),
						endTime: z
							.string()
							.transform((val) => Number(val))
							.refine((val) => !isNaN(val), {
								message: "EndTime must be a number",
							})
							.refine((val) => val >= 0 && val <= 24, {
								message: "EndTime must be between 0 and 24",
							}),
					},
					{ message: "Intervals error" }
				),
				{ message: "Array Error" }
			)
			.length(7, { message: "Total Lenght Error" })
			.transform((intervals) =>
				intervals.filter((interval) => interval.enabled)
			)
			.refine((intervals) => intervals.length > 0, {
				message: "Você precisa selecionar pelo menos 1 dia da semana.",
			})
			.transform((intervals) => {
				return intervals.map((interval) => {
					return {
						weekDay: interval.weekDay,
						startTimeInMinutes: interval.startTime * 60,
						endTimeInMinutes: interval.endTime * 60,
					};
				});
			})
			.refine(
				(intervals) => {
					return intervals.every(
						(interval) =>
							interval.endTimeInMinutes > interval.startTimeInMinutes
					);
				},
				{
					message:
						"Todos os horarios de termino de um dia, deve vir ao menos 1 hora depois do horario de inicio no mesmo dia.",
				}
			),
	},
	{ message: "Absolute Error" }
);

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		control,
		watch,
	} = useForm<TimeIntervalsFormInput>({
		// @ts-ignore
		resolver: zodResolver(timeIntervalsFormSchema),
		defaultValues: {
			intervals: [
				{ weekDay: 0, enabled: false, startTime: "8", endTime: "18" },
				{ weekDay: 1, enabled: true, startTime: "8", endTime: "18" },
				{ weekDay: 2, enabled: true, startTime: "8", endTime: "18" },
				{ weekDay: 3, enabled: true, startTime: "8", endTime: "18" },
				{ weekDay: 4, enabled: true, startTime: "8", endTime: "18" },
				{ weekDay: 5, enabled: true, startTime: "8", endTime: "18" },
				{ weekDay: 6, enabled: false, startTime: "8", endTime: "18" },
			],
		},
	});

	const { fields } = useFieldArray({
		control,
		name: "intervals",
	});

	const weekDays = getWeekDays();
	const intervals = watch("intervals");

	async function handleSetTimeIntervals({
		intervals,
	}: TimeIntervalsFormOutput) {
		// console.log("TEST ALLK");
		await api.post("/users/time-interval", intervals);
	}

	return (
		<TimeIntervalsContainer>
			<Header>
				<Heading as="strong">Quase lá</Heading>
				<Text>
					Defina o intervalo de horários que você está disponível em cada dia da
					semana.
				</Text>

				<MultiStep
					size={4}
					currentStep={3}
				/>
			</Header>
			<IntervalBox
				// @ts-ignore
				onSubmit={handleSubmit(handleSetTimeIntervals)}>
				<Box>
					<IntervalsContainer>
						{fields.map((field, index) => {
							return (
								<IntervalItem key={field.id}>
									<IntervalDay>
										<Controller
											name={`intervals.${index}.enabled`}
											control={control}
											render={({ field }) => {
												return (
													<Checkbox
														onCheckedChange={(checked) => {
															field.onChange(checked === true);
														}}
														checked={field.value}
													/>
												);
											}}
										/>
										<Text>{weekDays[field.weekDay]}</Text>
									</IntervalDay>
									<IntervalInput>
										<TimePicker
											disabled={intervals[index].enabled === false}
											{...register(`intervals.${index}.startTime`)}
										/>
										<TimePicker
											disabled={intervals[index].enabled === false}
											{...register(`intervals.${index}.endTime`)}
										/>
									</IntervalInput>
								</IntervalItem>
							);
						})}
					</IntervalsContainer>

					{errors.intervals && (
						<FormError>
							<Text size="sm">Erro: {errors.intervals.message}</Text>
						</FormError>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}>
						Próximo Passo
						<ArrowRight />
					</Button>
				</Box>
			</IntervalBox>
		</TimeIntervalsContainer>
	);
}
