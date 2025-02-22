import { HandPalm, Play } from "phosphor-react";
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import * as zod from "zod";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod
		.number()
		.min(5, "O intervalor precisa ser de no mínimo 5 minutos")
		.max(60, "O intervalor precisa ser de no máximo 60 minutos"),
});
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesContextData {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	setActiveCycleId: React.Dispatch<React.SetStateAction<string | null>>;
	setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
	secondsPassedAmount: number;
	setSecondsPassedAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [secondsPassedAmount, setSecondsPassedAmount] = useState<number>(0);
	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});
	const { handleSubmit, watch, reset } = newCycleForm;
	function handleCreateNewCycle(data: NewCycleFormData) {
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(newCycle.id);
		setSecondsPassedAmount(0);
		reset();
	}
	function handleInterruptCycle() {
		setCycles(
			cycles.map((cycle) => {
				if (cycle.id === activeCycleId)
					return { ...cycle, interruptedDate: new Date() };
				return cycle;
			})
		);
		setActiveCycleId(null);
	}
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
	const isSubmitButtonDisabled = !watch("task");

	return (
		<HomeContainer>
			<form
				onSubmit={handleSubmit(handleCreateNewCycle)}
				action="">
				<CyclesContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						setActiveCycleId,
						setCycles,
						secondsPassedAmount,
						setSecondsPassedAmount,
					}}>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<Countdown />
				</CyclesContext.Provider>
				{activeCycle ? (
					<StopCountdownButton
						onClick={handleInterruptCycle}
						type="button">
						<HandPalm size={24} />
						interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton
						disabled={isSubmitButtonDisabled}
						type="submit">
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
