import { PrismaAdapter } from "@/lib/auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { NextRequest } from "next/server";

export async function buildAuthOptions(
	cookieStore: RequestCookies
): Promise<NextAuthOptions> {
	return {
		adapter: await PrismaAdapter(cookieStore),
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT ?? "",
				clientSecret: process.env.GOOGLE_SECRET ?? "",
				authorization: {
					params: {
						prompt: "consent",
						access_type: "offline",
						response_type: "code",
						scope:
							"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
					},
				},
				// @ts-ignore
				profile: (profile: GoogleProfile) => {
					return {
						id: profile.sub,
						name: profile.name,
						username: "",
						email: profile.email,
						avatarUrl: profile.picture,
					};
				},
			}),
		],
		callbacks: {
			async signIn({ account }) {
				if (
					!account?.scope?.includes("https://www.googleapis.com/auth/calendar")
				)
					return "/register/connect-calendar?error=permissions";
				return true;
			},
			async session({ session, user }) {
				return {
					...session,
					user,
				};
			},
		},
	};
}

export const handler = async (req: NextRequest, res: any) => {
	return NextAuth(req, res, await buildAuthOptions(req.cookies));
};

export { handler as GET, handler as POST };
