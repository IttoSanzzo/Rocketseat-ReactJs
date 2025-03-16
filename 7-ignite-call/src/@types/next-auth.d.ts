import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		id: string;
		name: string;
		bio: string;
		email: string;
		username: string;
		avatarUrl: string;
	}

	interface Session {
		user: User;
	}
}
