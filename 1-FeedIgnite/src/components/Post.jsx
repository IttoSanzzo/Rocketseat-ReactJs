import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from "react";

export function Post({ author, content, publishedAt }) {
	const [newCommentText, setNewCommentText] = useState("");
	const [comments, setComments] = useState([
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
		{ locale: ptBr }
	);
	const relativePublishedDate = formatDistanceToNow(publishedAt, {
		locale: ptBr,
		addSuffix: true,
	});
	function handleCreateNewComment(event) {
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
				likes: 0,
			},
		]);
		setNewCommentText("");
	}
	function handleNewCommentChange(event) {
		setNewCommentText(event.target.value);
	}
	function handleInvalidNewComment(event) {
		event.target.setCustomValidity("Esse campo deve ser preenchido.");
		console.log(event.target);
	}
	function deleteComment(commentToDelete) {
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
