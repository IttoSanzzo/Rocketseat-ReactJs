import createComponent from "@/../libs/createComponent";
import styles from "./styles.module.css";

export const RegisterContainer = createComponent.main(styles.registerContainer);
export const Header = createComponent.div(styles.header);
export const Form = createComponent.form(styles.form);
export const FormError = createComponent.div(styles.formError);
