import createComponent from "../../../../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const TimeIntervalsContainer = createComponent.div(
	styles.timeIntervalsContainer
);
export const Header = createComponent.div(styles.header);
export const IntervalBox = createComponent.form(styles.intervalBox);
export const IntervalsContainer = createComponent.div(
	styles.intervalsContainer
);
export const IntervalItem = createComponent.div(styles.intervalItem);
export const IntervalDay = createComponent.div(styles.intervalDay);
export const IntervalInput = createComponent.div(styles.intervalInput);
export const FormError = createComponent.div(styles.formError);
