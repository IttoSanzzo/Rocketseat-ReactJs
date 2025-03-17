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

	const blockedDatesRaw = await prisma.$queryRaw`
		SELECT *
		FROM schedulings S

		WHERE S.userId = ${user.id}
			AND DATE_FORMAT(S.date, "%Y-&m") = ${`${year}-${month}`}
	`;

	return NextResponse.json(
		{ blockedWeekDays, blockedDatesRaw },
		{ status: 200 }
	);
}
