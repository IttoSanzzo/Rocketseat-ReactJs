import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from "./Avatar.tsx";
import { useState } from "react";
import { Content } from "./Post.tsx";

export interface CommentProps {
	id?: number;
	author: {
		name: string;
		avatarUrl: string;
	};
	content: Content[];
	publishedAt: Date;
	onDeleteComment?: (comment: Content[]) => void;
}

export function Comment({
	author,
	content,
	publishedAt,
	onDeleteComment,
}: CommentProps) {
	const [likeCount, setLikeCount] = useState(0);
	const formatedPublishedAt = format(
		publishedAt,
		"d 'de' LLLL 'às' HH':'mm'h'",
		{ locale: ptBR }
	);
	const relativePublishedDate = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});
	function handleDeleteComment() {
		onDeleteComment!(content);
	}
	function handleLikeComment() {
		setLikeCount((state) => {
			return state + 1;
		});
	}

	return (
		<div className={styles.comment}>
			<Avatar
				src={author.avatarUrl}
				hasBorder={false}
			/>
			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>{author.name}</strong>
							<time
								title={formatedPublishedAt}
								dateTime={publishedAt.toISOString()}>
								{relativePublishedDate}
							</time>
						</div>
						<button
							onClick={handleDeleteComment}
							title="Deletar comentário">
							<Trash size={24} />
						</button>
					</header>
					{content.map((line) => {
						if (line.type === "paragraph") {
							return <p key={line.content}>{line.content}</p>;
						} else if (line.type === "link") {
							return (
								<p key={line.content}>
									<a
										target="blank"
										href={line.link}>
										{line.content}
									</a>
								</p>
							);
						}
					})}
				</div>
				<footer>
					<button
						onClick={handleLikeComment}
						title="Aplaudir esse comentário!">
						<ThumbsUp />
						Aplaudir <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
