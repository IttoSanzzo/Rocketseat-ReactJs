import { PencilLine } from "phosphor-react";
import styles from "./Sidebar.module.css";
import coverImage from "../assets/cover-img.png";
import avatarImage from "../assets/avatar-img.png";
import { Avatar } from "./Avatar.tsx";

export function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<img
				className={styles.cover}
				src={coverImage}
				alt="Profile cover image"
			/>
			<div className={styles.profile}>
				<Avatar src={avatarImage} />
				<strong>Itto Sanzzo</strong>
				<span>Software Engineer</span>
			</div>
			<footer>
				<a href="#">
					<PencilLine size={20} />
					Editar seu Perfil
				</a>
			</footer>
		</aside>
	);
}
