import createComponent from "../../../../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const ConnectCalendarContainer = createComponent.div(
	styles.connectCalendarContainer
);
export const Header = createComponent.div(styles.header);
export const ConnectBox = createComponent.div(styles.connectBox);
export const ConnectItem = createComponent.div(styles.connectItem);
export const AuthError = createComponent.div(styles.authError);
