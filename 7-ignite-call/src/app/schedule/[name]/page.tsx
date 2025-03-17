"use client";

import { Avatar } from "@/components/DesignSystem/Avatar";
import { ScheduleContainer, UserHeader } from "./styledComponents";
import { useSession } from "next-auth/react";
import { Text } from "@/components/DesignSystem/Text";
import { Heading } from "@/components/DesignSystem/Heading";
import ScheduleForm from "./components/ScheduleForm";
import CalendarTimePickers from "@/components/Calendar/CalendarTimePickers/index";

export default function Schedule() {
	const session = useSession();

	if (session.status == "loading" || !session.data) return <></>;
	const { user } = session.data;

	return (
		<ScheduleContainer>
			<UserHeader>
				<Avatar src={user.avatarUrl} />
				<Heading>{user.name}</Heading>
				<Text>{user.bio}</Text>
			</UserHeader>
			<ScheduleForm />
		</ScheduleContainer>
	);
}
