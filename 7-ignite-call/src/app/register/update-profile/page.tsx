"use client";

import {
	FormAnnotation,
	Header,
	ProfileBox,
	UpdateProfileContainer,
} from "./styledComponents";
import { Box } from "@/components/DesignSystem/Box";
import { Text } from "@/components/DesignSystem/Text";
import { Button } from "@/components/DesignSystem/Button";
import { Heading } from "@/components/DesignSystem/Heading";
import { MultiStep } from "@/components/DesignSystem/MultiStep";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@/components/DesignSystem/TextArea";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "@/components/DesignSystem/Avatar";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

const updateProfileSchema = z.object({
	bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
	const session = useSession();
	const route = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UpdateProfileData>({
		resolver: zodResolver(updateProfileSchema),
	});

	async function handleUpdateProfile(data: UpdateProfileData) {
		await api.put("/users/update-profile", {
			bio: data.bio,
		});

		route.push(`/schedule/${user.username}`);
	}

	if (session.status == "loading" || !session.data) return <></>;
	const { user } = session.data;

	return (
		<UpdateProfileContainer>
			<Header>
				<Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
				<Text>
					Precisamos de algumas informações para criar seu perfil! Ah, você pode
					editar essas informações depois.
				</Text>

				<MultiStep
					size={4}
					currentStep={4}
				/>
			</Header>
			<ProfileBox onSubmit={handleSubmit(handleUpdateProfile)}>
				<Box>
					<label>
						<Text>Foto de perfil</Text>

						<Avatar
							src={user.avatarUrl}
							alt={user.name}
						/>
					</label>
					<label>
						<Text size="sm">Sobre você</Text>
						<TextArea {...register("bio")} />
						<FormAnnotation>
							Fale um pouco sobre você. Isto será exibido em sua página pessoal.
						</FormAnnotation>
					</label>

					<Button
						type="submit"
						disabled={isSubmitting}>
						Finalizar
						<ArrowRight />
					</Button>
				</Box>
			</ProfileBox>
		</UpdateProfileContainer>
	);
}
