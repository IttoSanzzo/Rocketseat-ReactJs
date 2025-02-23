import { zodResolver } from "@hookform/resolvers/zod";
import {
	createContext,
	ReactNode,
	useEffect,
	useReducer,
	useState,
} from "react";
import {
	useForm,
	UseFormHandleSubmit,
	UseFormReturn,
	UseFormWatch,
} from "react-hook-form";
import * as zod from "zod";
import { Cycle, cyclesReducer, CyclesState } from "../reducers/cycles/reducer";
import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, "Informe a tarefa"),
	minutesAmount: zod
		.number()
		.min(5, "O intervalor precisa ser de no mínimo 5 minutos")
		.max(60, "O intervalor precisa ser de no máximo 60 minutos"),
});
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
interface CyclesContextData {
	activeCycle: Cycle | undefined;
	cyclesState: CyclesState;
	dispatchToCyclesState: React.ActionDispatch<[action: any]>;
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
	markCurrentCycleAsFinished: () => void;
}
interface CyclesContextProviderProps {
	children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	const [cyclesState, dispatchToCyclesState] = useReducer(
		cyclesReducer,
		{
			cycles: [],
			activeCycleId: null,
		},
		(initialState) => {
			const storageStateAsJSON = localStorage.getItem(
				"@ignite-timer:cycles-state:1.0.0"
			);
			if (storageStateAsJSON) {
				return JSON.parse(storageStateAsJSON);
			}
			return initialState;
		}
	);
	const activeCycle = cyclesState.cycles.find(
		(cycle) => cycle.id === cyclesState.activeCycleId
	);
	const [secondsPassedAmount, setSecondsPassedAmount] = useState<number>(() => {
		if (activeCycle) {
			return differenceInSeconds(new Date(), activeCycle.startDate);
		}
		return 0;
	});
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
		dispatchToCyclesState(addNewCycleAction(newCycle));
		setSecondsPassedAmount(0);
		reset();
	}
	function handleInterruptCycle() {
		dispatchToCyclesState(interruptCurrentCycleAction());
	}
	function markCurrentCycleAsFinished() {
		dispatchToCyclesState(markCurrentCycleAsFinishedAction());
	}
	useEffect(() => {
		const stateJson = JSON.stringify(cyclesState);
		localStorage.setItem("@ignite-timer:cycles-state:1.0.0", stateJson);
	}, [cyclesState]);

	return (
		<CyclesContext.Provider
			value={{
				activeCycle,
				cyclesState,
				dispatchToCyclesState,
				secondsPassedAmount,
				setSecondsPassedAmount,
				handleCreateNewCycle,
				handleInterruptCycle,
				handleSubmit,
				watch,
				newCycleForm,
				markCurrentCycleAsFinished,
			}}>
			{children}
		</CyclesContext.Provider>
	);
}
