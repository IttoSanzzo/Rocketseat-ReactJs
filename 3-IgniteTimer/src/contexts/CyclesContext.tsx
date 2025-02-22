import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useState } from "react";
import {
	useForm,
	UseFormHandleSubmit,
	UseFormReturn,
	UseFormWatch,
} from "react-hook-form";
import * as zod from "zod";

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
	cycles: Cycle[];
	setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
	secondsPassedAmount: number;
	setSecondsPassedAmount: React.Dispatch<React.SetStateAction<number>>;
	handleCreateNewCycle: (data: NewCycleFormData) => void;
	handleInterruptCycle: () => void;
	handleSubmit: UseFormHandleSubmit<
		{ task: string; minutesAmount: number },
		undefined
	>;
	watch: UseFormWatch<{ task: string; minutesAmount: number }>;
	newCycleForm: UseFormReturn<
		{
			task: string;
			minutesAmount: number;
		},
		any,
		undefined
	>;
}
interface CyclesContextProviderProps {
	children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
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

	return (
		<CyclesContext.Provider
			value={{
				activeCycle,
				activeCycleId,
				setActiveCycleId,
				cycles,
				setCycles,
				secondsPassedAmount,
				setSecondsPassedAmount,
				handleCreateNewCycle,
				handleInterruptCycle,
				handleSubmit,
				watch,
				newCycleForm,
			}}>
			{children}
		</CyclesContext.Provider>
	);
}
