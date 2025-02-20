import { Header } from "./components/Header.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { Post, PostProps } from "./components/Post.tsx";
import styles from "./App.module.css";
import "./global.css";

const posts: PostProps[] = [
	{
		id: 1,
		author: {
			name: "Itto Bezarius",
			role: "Zenshin Zenho",
			avatarUrl: "https://github.com/IttoSanzzo.png",
		},
		content: [
			{ type: "paragraph", content: "Yohayou everyone" },
			{ type: "paragraph", content: "I dont really have much to say" },
			{
				type: "link",
				link: "https://github.com/IttoSanzzo",
				content: "My GitHub",
			},
		],
		publishedAt: new Date("2025-02-18 17:39:00"),
	},
	{
		id: 2,
		author: {
			name: "Swordinary",
			role: "Dheff-sama",
			avatarUrl:
				"https://cdn.discordapp.com/avatars/903012637665804340/b428fdbecdfa14a88d978cab28d913a1.webp?size=128",
		},
		content: [
			{ type: "paragraph", content: "Eu lhes dou minha benção" },
			{ type: "paragraph", content: "Sintam-se honrados." },
		],
		publishedAt: new Date("2025-02-17 14:39:00"),
	},
];

function App() {
	return (
		<div>
			<Header />
			<div className={styles.wrapper}>
				<Sidebar />
				<main>
					{posts.map((post) => {
						return (
							<Post
								key={post.id}
								author={post.author}
								content={post.content}
								publishedAt={post.publishedAt}
							/>
						);
					})}
				</main>
			</div>
		</div>
	);
}

export default App;
