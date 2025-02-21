import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
	FormContainer,
	HomeContainer,
	CountdownContainer,
	Separator,
	StartCountdownButton,
	MinutesAmountInput,
	TaskInput,
} from "./styles";
import { useState } from "react";

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
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [secondsPassedAmount, setSecondsPassedAmount] = useState<number>(0);
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});
	function handleCreateNewCycle(data: NewCycleFormData) {
		const newCycle: Cycle = {
			id: String(new Date().getTime()),
			task: data.task,
			minutesAmount: data.minutesAmount,
		};
		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(newCycle.id);
		reset();
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const totalSecondsRemaining = activeCycle
		? totalSeconds - secondsPassedAmount * 60
		: 0;
	const currentMinutesRemaining = Math.floor(totalSecondsRemaining / 60);
	const currentSecondsRemaining = totalSecondsRemaining % 60;
	const isSubmitButtonDisabled = !watch("task");
	console.log(activeCycle);

	return (
		<HomeContainer>
			<form
				onSubmit={handleSubmit(handleCreateNewCycle)}
				action="">
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput
						id="task"
						list="task-suggestions"
						placeholder="Dê um nome para o seu projeto"
						{...register("task")}
					/>
					<datalist id="task-suggestions">
						<option value="Banana" />
						<option value="Albina" />
					</datalist>
					<label htmlFor="number">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						step={5}
						min={5}
						max={60}
						{...register("minutesAmount", { valueAsNumber: true })}
					/>
					<span>Minutos.</span>
				</FormContainer>
				<CountdownContainer>
					<span>{Math.floor(currentMinutesRemaining / 10)}</span>
					<span>{currentMinutesRemaining % 10}</span>
					<Separator>:</Separator>
					<span>{Math.floor(currentSecondsRemaining / 10)}</span>
					<span>{currentSecondsRemaining % 10}</span>
				</CountdownContainer>
				<StartCountdownButton
					disabled={isSubmitButtonDisabled}
					type="submit">
					<Play size={24} />
					Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}
