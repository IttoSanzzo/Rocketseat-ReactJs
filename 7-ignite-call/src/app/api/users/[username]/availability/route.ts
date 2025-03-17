import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

interface getProps {
	params: { username: string };
}

export async function GET(req: NextRequest, { params }: getProps) {
	const { username } = await params;
	const searchParams = await req.nextUrl.searchParams;
	const date = searchParams.get("date");
	if (!date)
		return NextResponse.json({ message: "Date not provided" }, { status: 400 });

	const user = await prisma.user.findUnique({
		where: { username: username },
	});
	if (!user)
		return NextResponse.json(
			{ message: "User does not exist." },
			{ status: 400 }
		);

	const referenceDate = dayjs(String(date));
	const isPastDate = referenceDate.endOf("day").isBefore(new Date());
	if (isPastDate)
		return NextResponse.json(
			{ possibleTimes: [], availableTimes: [] },
			{ status: 200 }
		);

	const userAvailability = await prisma.userTimeInterval.findFirst({
		where: {
			userId: user.id,
			weekDay: referenceDate.get("day"),
		},
	});
	if (!userAvailability)
		return NextResponse.json(
			{ possibleTimes: [], availableTimes: [] },
			{ status: 200 }
		);

	const { timeStartInMinutes, timeEndInMinutes } = userAvailability;
	const startHour = timeStartInMinutes / 60;
	const endHour = timeEndInMinutes / 60;

	const possibleTimes = Array.from({ length: endHour - startHour }).map(
		(_, index) => startHour + index
	);

	const blockedTimes = await prisma.scheduling.findMany({
		where: {
			userId: user.id,
			date: {
				gte: referenceDate.set("hour", startHour).toDate(),
				lte: referenceDate.set("hour", endHour).toDate(),
			},
		},
		select: {
			date: true,
		},
	});

	const availableTimes = possibleTimes.filter(
		(time) =>
			!blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time)
	);

	return NextResponse.json({ possibleTimes, availableTimes }, { status: 200 });
}
