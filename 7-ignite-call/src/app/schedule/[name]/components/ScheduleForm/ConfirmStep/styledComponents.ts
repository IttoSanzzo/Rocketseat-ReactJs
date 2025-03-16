import createComponent from "../../../../../../../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const ConfirmStepContainer = createComponent.form(
	styles.confirmStepContainer
);
export const FormHeader = createComponent.div(styles.formHeader);
export const FormError = createComponent.div(styles.formError);
export const FormActions = createComponent.div(styles.formActions);
