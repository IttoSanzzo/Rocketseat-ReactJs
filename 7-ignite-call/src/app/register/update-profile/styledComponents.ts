import createComponent from "../../../../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const UpdateProfileContainer = createComponent.div(
	styles.updateProfileContainer
);
export const FormAnnotation = createComponent.div(styles.formAnnotation);
export const Header = createComponent.div(styles.header);
export const ProfileBox = createComponent.form(styles.profileBox);
