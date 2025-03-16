import createComponent from "../../../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const CalendarContainer = createComponent.div(styles.calendarContainer);
export const CalendarHeader = createComponent.div(styles.calendarHeader);
export const CalendarTitle = createComponent.div(styles.calendarTitle);
export const CalendarActions = createComponent.div(styles.calendarActions);
export const CalendarBody = createComponent.table(styles.calendarBody);
export const CalendarDay = createComponent.button(styles.calendarDay);
