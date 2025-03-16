import createComponent from "../../../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const CalendarTimePickersContainer = createComponent.div(
	`${styles.calendarTimePickersContainer}`
);
export const CalendarTimePickerHeader = createComponent.div(
	styles.calendarTimePickersHeader
);
export const CalendarTimePickerList = createComponent.div(
	styles.calendarTimePickersList
);
export const CalendarTimePickerItem = createComponent.button(
	styles.calendarTimePickersItem
);
