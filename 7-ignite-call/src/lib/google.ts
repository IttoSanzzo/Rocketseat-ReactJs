import { google } from "googleapis";
import { prisma } from "./prisma";
import dayjs from "dayjs";

export async function getGoogleOAuthToken(userId: string) {
	const account = await prisma.account.findFirstOrThrow({
		where: {
			providerId: "google",
			userId: userId,
		},
	});

	const auth = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT,
		process.env.GOOGLE_SECRET
	);

	auth.setCredentials({
		access_token: account.accessToken,
		refresh_token: account.refreshToken,
		expiry_date: account.accessTokenExpires?.getTime(),
	});

	if (!account.accessTokenExpires) return auth;

	const isTokenExpired = dayjs(account.accessTokenExpires).isBefore(new Date());
	if (isTokenExpired) {
		const { credentials } = await auth.refreshAccessToken();
		const { access_token, refresh_token } = credentials;
		const accessTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

		await prisma.account.update({
			where: {
				id: account.id,
			},
			data: {
				accessToken: access_token,
				accessTokenExpires: accessTokenExpires,
				refreshToken: refresh_token,
			},
		});

		auth.setCredentials({
			access_token,
			refresh_token,
			expiry_date: accessTokenExpires.getTime(),
		});
	}

	return auth;
}
