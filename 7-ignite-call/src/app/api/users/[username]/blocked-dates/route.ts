import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

interface getProps {
	params: { username: string };
}

export async function GET(req: NextRequest, { params }: getProps) {
	const { username } = await params;
	const searchParams = await req.nextUrl.searchParams;
	const year = searchParams.get("year");
	const month = searchParams.get("month");
	if (!year || !month)
		return NextResponse.json(
			{ message: "Year or month not provided" },
			{ status: 400 }
		);

	const user = await prisma.user.findUnique({
		where: { username: username },
	});
	if (!user)
		return NextResponse.json(
			{ message: "User does not exist." },
			{ status: 400 }
		);

	const availableWeekDays = await prisma.userTimeInterval.findMany({
		where: {
			userId: user.id,
		},
		select: {
			weekDay: true,
		},
	});
	const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(
		(weekDay) =>
			!availableWeekDays.some(
				(availableWeekDay) => availableWeekDay.weekDay === weekDay
			)
	);

	const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
		SELECT
			EXTRACT(DAY FROM S.date) AS date,
				COUNT(S.date) as amount,
				((UTI.timeEndInMinutes - UTI.timeStartInMinutes) / 60) AS size
		FROM schedulings S

		LEFT JOIN userTimeIntervals UTI
			ON UTI.weekDay = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
		
		WHERE S.userId = ${user.id}
			AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month.padStart(2, "0")}`}
		
		GROUP BY EXTRACT(DAY FROM S.date),
			((UTI.timeEndInMinutes - UTI.timeStartInMinutes) / 60)

		HAVING amount >= size
	`;

	const blockedDates = blockedDatesRaw.map((item) => Number(item.date));

	return NextResponse.json({ blockedWeekDays, blockedDates }, { status: 200 });
}
