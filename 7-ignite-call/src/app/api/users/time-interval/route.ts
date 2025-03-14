import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { buildAuthOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

interface interval {
	weekDay: number;
	startTimeInMinutes: number;
	endTimeInMinutes: number;
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(await buildAuthOptions(req.cookies));
	if (!session)
		return NextResponse.json(
			{ message: "Missing authentication." },
			{ status: 401 }
		);

	const intervals: interval[] = await req.json();

	await Promise.all(
		intervals.map((interval) => {
			return prisma.userTimeInterval.create({
				data: {
					weekDay: interval.weekDay,
					timeStartInMinutes: interval.startTimeInMinutes,
					timeEndInMinutes: interval.endTimeInMinutes,
					user: { connect: { id: session.user.id } },
				},
			});
		})
	);

	return NextResponse.json(
		{ message: "Created Successfully" },
		{ status: 201 }
	);
}
