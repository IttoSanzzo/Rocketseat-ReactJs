import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { google } from "googleapis";
import { getGoogleOAuthToken } from "@/lib/google";

interface getProps {
	params: { username: string };
}

const createSchedulingBody = z.object({
	name: z.string(),
	email: z.string().email(),
	observations: z.string(),
	date: z.string().datetime(),
});

export async function POST(req: NextRequest, { params }: getProps) {
	const { username } = await params;

	const user = await prisma.user.findUnique({
		where: { username: username },
	});
	if (!user)
		return NextResponse.json(
			{ message: "User does not exist." },
			{ status: 400 }
		);

	const body = await req.json();
	const { name, email, observations, date } = createSchedulingBody.parse(body);

	const schedulingDate = dayjs(date).startOf("hour");

	if (schedulingDate.isBefore(new Date()))
		return NextResponse.json(
			{ message: "Date is in the past." },
			{ status: 400 }
		);

	const conflictingScheduling = await prisma.scheduling.findFirst({
		where: {
			userId: user.id,
			date: schedulingDate.toDate(),
		},
	});
	if (!!conflictingScheduling)
		return NextResponse.json(
			{ message: "There is another scheduling at the same time." },
			{ status: 400 }
		);

	const scheduling = await prisma.scheduling.create({
		data: {
			date: schedulingDate.toDate(),
			name,
			email,
			observations,
			userId: user.id,
		},
	});

	const calendar = google.calendar({
		version: "v3",
		auth: await getGoogleOAuthToken(user.id),
	});

	await calendar.events.insert({
		calendarId: "primary",
		conferenceDataVersion: 1,
		requestBody: {
			summary: `Ignite Call: ${name}`,
			description: observations,
			start: {
				dateTime: schedulingDate.format(),
			},
			end: {
				dateTime: schedulingDate.add(1, "hour").format(),
			},
			attendees: [{ email, displayName: name }],
			conferenceData: {
				createRequest: {
					requestId: scheduling.id,
					conferenceSolutionKey: {
						type: "hangoutsMeet",
					},
				},
			},
		},
	});

	return new NextResponse(null, { status: 201 });
}
