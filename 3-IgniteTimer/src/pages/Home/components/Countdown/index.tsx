import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown({}) {
	const {
		activeCycle,
		cyclesState,
		secondsPassedAmount,
		setSecondsPassedAmount,
		markCurrentCycleAsFinished,
	} = useContext(CyclesContext);
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const totalSecondsRemaining = activeCycle
		? totalSeconds - secondsPassedAmount
		: 0;
	useEffect(() => {
		if (!activeCycle) return;
		const interval = setInterval(() => {
			const currentSecondsDifference = differenceInSeconds(
				new Date(),
				activeCycle.startDate
			);
			if (currentSecondsDifference >= totalSeconds) {
				markCurrentCycleAsFinished();
				clearInterval(interval);
				return;
			}
			setSecondsPassedAmount(currentSecondsDifference);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, totalSeconds, cyclesState.activeCycleId]);
	const currentMinutesRemaining = Math.floor(totalSecondsRemaining / 60);
	const currentSecondsRemaining = totalSecondsRemaining % 60;
	useEffect(() => {
		if (!activeCycle) return;
		document.title = `Ignite Timer ${currentMinutesRemaining}:${currentSecondsRemaining}`;
	}, [currentMinutesRemaining, currentSecondsRemaining, activeCycle]);

	return (
		<CountdownContainer>
			<span>{Math.floor(currentMinutesRemaining / 10)}</span>
			<span>{currentMinutesRemaining % 10}</span>
			<Separator>:</Separator>
			<span>{Math.floor(currentSecondsRemaining / 10)}</span>
			<span>{currentSecondsRemaining % 10}</span>
		</CountdownContainer>
	);
}
