import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	if (req.method !== "POST") return NextResponse.json({ status: 405 });
	const { name, username } = await req.json();

	const userExists = await prisma.user.findUnique({
		where: {
			username,
		},
	});
	if (userExists)
		return NextResponse.json(
			{ message: "Username already taken." },
			{ status: 400 }
		);

	const user = await prisma.user.create({
		data: {
			name: name,
			username: username,
		},
	});

	const response = NextResponse.json({ user }, { status: 201 });
	response.cookies.set("@ignitecall:userId", user.id, {
		maxAge: 60 * 60, // 1 hour
		path: "/",
	});

	return response;
}
