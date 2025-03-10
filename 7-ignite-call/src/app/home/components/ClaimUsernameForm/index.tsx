"use client";

import { TextInput } from "@/components/DesignSystem/TextInput";
import { Form, FormAnnotation } from "./styledComponents";
import { Button } from "@/components/DesignSystem/Button";
import { ArrowRight } from "phosphor-react";
import { Box } from "@/components/DesignSystem/Box";
import { Text } from "@/components/DesignSystem/Text";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const claimUsernameFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Deve conter pelo menos 3 caracteres." })
		.regex(/^([a-z\\-]+)$/i, {
			message: "O usuario pode conter apenas letras e hifens",
		})
		.transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export default function ClaimUsernameForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ClaimUsernameFormData>({
		resolver: zodResolver(claimUsernameFormSchema),
	});

	async function handleClaimUsername(data: ClaimUsernameFormData) {
		router.push(`/register?username=${data.username}`);
	}

	return (
		<>
			<Form onSubmit={handleSubmit(handleClaimUsername)}>
				<Box>
					<TextInput
						size="sm"
						prefix="ignite.com/"
						placeholder="seu-usuario"
						{...register("username")}
					/>
					<Button
						size="sm"
						type="submit"
						disabled={isSubmitting}>
						Reservar
						<ArrowRight />
					</Button>
				</Box>
			</Form>
			<FormAnnotation>
				<Text size="sm">
					{!!errors.username
						? errors.username?.message
						: "Digite o nome do usuário desejado"}
				</Text>
			</FormAnnotation>
		</>
	);
}
