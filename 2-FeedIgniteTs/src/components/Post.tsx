import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar } from "./Avatar.tsx";
import { Comment, CommentProps } from "./Comment.tsx";
import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

export interface Content {
	type: "paragraph" | "link";
	content: string;
	link?: string;
}
export interface PostProps {
	id?: number;
	author: {
		name: string;
		role: string;
		avatarUrl: string;
	};
	content: Content[];
	publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
	const [newCommentText, setNewCommentText] = useState("");
	const [comments, setComments] = useState<CommentProps[]>([
		{
			id: 1,
			author: {
				name: "Envest Drean",
				avatarUrl: "https://github.com/Envest-Drean.png",
			},
			content: [{ type: "paragraph", content: "Não entendi..." }],
			publishedAt: new Date(),
		},
		{
			id: 2,
			author: {
				name: "Envest Drean",
				avatarUrl: "https://github.com/Envest-Drean.png",
			},
			content: [{ type: "paragraph", content: "Ainda não entendi..." }],
			publishedAt: new Date(),
		},
	]);
	const formatedPublishedAt = format(
		publishedAt,
		"d 'de' LLLL 'às' HH':'mm'h'",
		{ locale: ptBR }
	);
	const relativePublishedDate = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});
	function handleCreateNewComment(event: FormEvent) {
		event.preventDefault();
		setComments([
			...comments,
			{
				id: comments.length + 1,
				author: {
					name: "Itto Sanzzo",
					avatarUrl: "http://127.0.0.1:3002/src/assets/avatar-img.png",
				},
				content: [{ type: "paragraph", content: newCommentText }],
				publishedAt: new Date(),
			},
		]);
		setNewCommentText("");
	}
	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setNewCommentText(event.target.value);
	}
	function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity("Esse campo deve ser preenchido.");
	}
	function deleteComment(commentToDelete: Content[]) {
		const commentsWithoutDeletedOne = comments.filter((comment) => {
			return comment.content !== commentToDelete;
		});
		setComments(commentsWithoutDeletedOne);
	}
	const isNewCommentEmpty = newCommentText.length == 0;

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>
				<time
					title={formatedPublishedAt}
					dateTime={publishedAt.toISOString()}>
					{relativePublishedDate}
				</time>
			</header>
			<div className={styles.content}>
				{content.map((line, index) => {
					if (line.type === "paragraph") {
						return <p key={index}>{line.content}</p>;
					} else if (line.type === "link") {
						return (
							<p key={index}>
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
			<form
				onSubmit={handleCreateNewComment}
				className={styles.commentForm}>
				<strong>Deixe seu feedback</strong>
				<textarea
					name="comment"
					placeholder="Deixe seu comentário"
					onChange={handleNewCommentChange}
					value={newCommentText}
					onInvalid={handleInvalidNewComment}
					required
				/>
				<footer>
					<button
						type="submit"
						disabled={isNewCommentEmpty}>
						Comentar
					</button>
				</footer>
			</form>
			<div className={styles.commentList}>
				{comments.map((comment) => {
					return (
						<Comment
							key={comment.id}
							author={comment.author}
							content={comment.content}
							publishedAt={comment.publishedAt}
							onDeleteComment={deleteComment}
						/>
					);
				})}
			</div>
		</article>
	);
}
