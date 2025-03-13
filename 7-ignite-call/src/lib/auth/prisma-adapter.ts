"use server";

import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

interface userProps {
	id: string;
	username: string;
	name: string;
	email?: string;
	avatarUrl?: string;
	createdAt: any;
	accounts: any;
	sessions: any;
}
interface accountProps {
	id: string;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refreshToken?: string;
	access_token?: string;
	expires_at?: any;
	createdAt: any;
	updatedAt: any;
	user: any;
}

export async function PrismaAdapter(
	cookieStore: RequestCookies
): Promise<Adapter> {
	console.log("ADAPTER");
	return {
		async createUser(user: userProps) {
			console.log("Running CreateUser");
			const userIdOnCookies = String(
				cookieStore.get("@ignitecall:userId")?.value
			);
			if (!userIdOnCookies) throw new Error("User Id not fount on cookies.");

			const prismaUser = await prisma.user.update({
				where: {
					id: userIdOnCookies,
				},
				data: {
					name: user.name,
					email: user.email,
					avatarUrl: user.avatarUrl,
				},
			});
			cookieStore.delete("@ignitecall:userId");

			return {
				id: prismaUser.id,
				name: prismaUser.name,
				username: prismaUser.username,
				email: prismaUser.email!,
				avatarUrl: prismaUser.avatarUrl!,
				emailVerified: null,
			};
		},
		async getUser(id) {
			console.log("Running getUser");
			const user = await prisma.user.findUnique({ where: { id } });
			if (!user) return null;

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email!,
				emailVerified: null,
				avatarUrl: user.avatarUrl!,
			};
		},
		async getUserByAccount({ providerAccountId, provider }) {
			console.log("Running getUserByAccount");
			const account = await prisma.account.findUnique({
				where: {
					providerId_providerAccountId: {
						providerAccountId,
						providerId: provider,
					},
				},
			});
			if (!account) return null;

			const user = await prisma.user.findUnique({
				where: {
					id: account.userId,
				},
			});
			if (!user) return null;

			return {
				avatarUrl: user.avatarUrl!,
				email: user.email!,
				emailVerified: null,
				id: user.id,
				name: user.name,
				username: user.username,
			};
		},
		async getUserByEmail(email) {
			console.log("Running getUserByEmail");
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user) return null;

			return {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email!,
				emailVerified: null,
				avatarUrl: user.avatarUrl!,
			};
		},
		async updateUser(user) {
			console.log("Running updateUser");
			const updatedUser = await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					name: user.name,
					email: user.email,
					avatarUrl: user.avatarUrl,
				},
			});

			return {
				id: updatedUser.id,
				name: updatedUser.name,
				username: updatedUser.username,
				email: updatedUser.email!,
				emailVerified: null,
				avatarUrl: updatedUser.avatarUrl!,
			};
		},
		async deleteUser(userId) {
			console.log("Running deleteUser");
			await prisma.user.delete({
				where: {
					id: userId,
				},
			});
		},
		async linkAccount(account: accountProps) {
			console.log("Running linkAccount");

			if (!account.userId || !account.providerAccountId)
				throw new Error("Missing required fields");

			const accessTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

			await prisma.account.create({
				data: {
					providerType: account.type,
					providerId: account.provider,
					providerAccountId: account.providerAccountId,
					refreshToken: account.refreshToken || null,
					accessToken: account.access_token || null,
					accessTokenExpires: accessTokenExpires || null,
					id: account.id || undefined,
					user: { connect: { id: account.userId } },
				},
			});
		},
		async createSession({ sessionToken, userId, expires }) {
			console.log("Running CreateSession");
			await prisma.session.create({
				data: {
					userId: userId,
					expires: expires,
					sessionToken: sessionToken,
				},
			});
			return {
				userId,
				sessionToken,
				expires,
			};
		},
		async getSessionAndUser(sessionToken) {
			console.log("Running getSessionAndUser");
			const prismaSession = await prisma.session.findUnique({
				where: { sessionToken: sessionToken },
				include: {
					user: true,
				},
			});
			if (!prismaSession) return null;
			const { user, ...session } = prismaSession;

			return {
				session: {
					userId: session.userId,
					expires: session.expires,
					sessionToken: session.sessionToken,
				},
				user: {
					id: user.id,
					name: user.name,
					username: user.username,
					email: user.email!,
					emailVerified: null,
					avatarUrl: user.avatarUrl!,
				},
			};
		},
		async updateSession({ sessionToken, userId, expires }) {
			console.log("Running updateSession");
			const updatedSession = await prisma.session.update({
				where: {
					sessionToken: sessionToken,
				},
				data: {
					expires,
					userId: userId,
				},
			});

			return {
				sessionToken: updatedSession.sessionToken,
				userId: updatedSession.userId,
				expires: updatedSession.expires,
			};
		},
		async deleteSession(sessionToken) {
			console.log("Running deleteSession");
			await prisma.session.delete({
				where: {
					sessionToken: sessionToken,
				},
			});
		},
	};
}
