import { Cycle } from "./reducer";

export enum ActionTypes {
	ADD_NEW_CYCLE = 0,
	INTERRUPT_CURRENT_CYCLE = 1,
	MARK_CURRENT_CYCLES_AS_FINISHED = 2,
}

export function addNewCycleAction(newCycle: Cycle) {
	return {
		type: ActionTypes.ADD_NEW_CYCLE,
		payload: {
			newCycle,
		},
	};
}
export function interruptCurrentCycleAction() {
	return {
		type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
	};
}
export function markCurrentCycleAsFinishedAction() {
	return {
		type: ActionTypes.MARK_CURRENT_CYCLES_AS_FINISHED,
	};
}
