"use client";

import { RegisterContainer, Header, Form, FormError } from "./styledComponents";
import { Box } from "@/components/DesignSystem/Box";
import { Text } from "@/components/DesignSystem/Text";
import { Button } from "@/components/DesignSystem/Button";
import { Heading } from "@/components/DesignSystem/Heading";
import { TextInput } from "@/components/DesignSystem/TextInput";
import { MultiStep } from "@/components/DesignSystem/MultiStep";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: "O username conter pelo menos 3 caracteres." })
		.regex(/^([a-z\\-]+)$/i, {
			message: "O usuario pode conter apenas letras e hifens",
		})
		.transform((username) => username.toLowerCase()),
	name: z
		.string()
		.min(3, { message: "O nome deve conter pelo menos 3 caracteres." }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const searchParams = useSearchParams();
	const username = String(searchParams.get("username"));

	useEffect(() => {
		if (username) {
			setValue("username", username);
		}
	}, [username]);

	async function handleRegister(data: RegisterFormData) {
		try {
			await api.post("/users", {
				name: data.name,
				username: data.username,
			});
			router.push(`/register/connect-calendar`);
		} catch (err: any) {
			if (err instanceof AxiosError && err?.response?.data?.message) {
				alert(err.response.data.message);
				return;
			}
			console.error(err);
		}
	}

	return (
		<RegisterContainer>
			<Header>
				<Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
				<Text>
					Precisamos de algumas informações para criar seu perfil! Ah, você pode
					editar essas informações depois.
				</Text>

				<MultiStep
					size={4}
					currentStep={1}
				/>
			</Header>
			<Form onSubmit={handleSubmit(handleRegister)}>
				<Box>
					<label>
						<Text size="sm">Nome de usuário</Text>
						<TextInput
							prefix="ignite.com/"
							placeholder="seu-usuario"
							{...register("username")}
						/>
						{errors.username && (
							<FormError>
								<Text size="sm">{errors.username.message}</Text>
							</FormError>
						)}
						<Text size="sm">Nome Completo</Text>
						<TextInput
							placeholder="Seu nome"
							{...register("name")}
						/>
						{errors.name && (
							<FormError>
								<Text size="sm">{errors.name.message}</Text>
							</FormError>
						)}

						<Button
							type="submit"
							disabled={isSubmitting}>
							Próximo Passo
							<ArrowRight />
						</Button>
					</label>
				</Box>
			</Form>
		</RegisterContainer>
	);
}
