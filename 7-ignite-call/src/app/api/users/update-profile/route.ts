import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { buildAuthOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

interface updateProfile {
	bio: string;
}

export async function PUT(req: NextRequest) {
	const session = await getServerSession(await buildAuthOptions(req.cookies));
	if (!session)
		return NextResponse.json(
			{ message: "Missing authentication." },
			{ status: 401 }
		);

	const { bio }: updateProfile = await req.json();

	await prisma.user.update({
		where: {
			id: session.user.id,
		},
		data: {
			bio: bio,
		},
	});

	return NextResponse.json(
		{ message: "Updated Successfully" },
		{ status: 201 }
	);
}
