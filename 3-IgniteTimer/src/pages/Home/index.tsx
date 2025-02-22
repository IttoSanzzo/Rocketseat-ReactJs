import { HandPalm, Play } from "phosphor-react";
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";

export function Home() {
	const {
		activeCycle,
		handleSubmit,
		handleCreateNewCycle,
		handleInterruptCycle,
		watch,
		newCycleForm,
	} = useContext(CyclesContext);
	const isSubmitButtonDisabled = !watch("task");

	return (
		<HomeContainer>
			<form
				onSubmit={handleSubmit(handleCreateNewCycle)}
				action="">
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />
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
