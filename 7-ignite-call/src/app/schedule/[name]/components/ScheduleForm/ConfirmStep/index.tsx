import { Text } from "@/components/DesignSystem/Text";
import {
	ConfirmStepContainer,
	FormActions,
	FormError,
	FormHeader,
} from "./styledComponents";
import { CalendarBlank, Clock } from "phosphor-react";
import { TextInput } from "@/components/DesignSystem/TextInput";
import { TextArea } from "@/components/DesignSystem/TextArea";
import { Button } from "@/components/DesignSystem/Button";
import { Box } from "@/components/DesignSystem/Box";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmFormSchema = z.object({
	name: z
		.string()
		.min(3, { message: "O nome precisa conter ao menos 3 caracteres." }),
	email: z.string().email({ message: "Digite um e-mail precisa ser válido." }),
	observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export default function ConfirmStep() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(confirmFormSchema),
	});

	function handleConfirmScheduling(data: ConfirmFormData) {
		console.log(data);
	}

	return (
		<ConfirmStepContainer onSubmit={handleSubmit(handleConfirmScheduling)}>
			<Box>
				<FormHeader>
					<Text>
						<CalendarBlank />
						22 de Setembro de 2025
					</Text>
					<Text>
						<Clock />
						28:00h
					</Text>
				</FormHeader>

				<label>
					<Text size="sm">Nome Completo</Text>
					<TextInput
						placeholder="Seu nome"
						{...register("name")}
					/>
					{errors.name && (
						<FormError>
							<Text size="sm">Erro: {errors.name.message}</Text>
						</FormError>
					)}
				</label>
				<label>
					<Text size="sm">Endereço de Email</Text>
					<TextInput
						type="email"
						placeholder="itto@example.com"
						{...register("email")}
					/>
					{errors.email && (
						<FormError>
							<Text size="sm">Erro: {errors.email.message}</Text>
						</FormError>
					)}
				</label>
				<label>
					<Text size="sm">Observações</Text>
					<TextArea {...register("observations")} />
				</label>

				<FormActions>
					<Button
						type="button"
						variant="tertiary "
						disabled={isSubmitting}>
						Cancelar
					</Button>
					<Button
						type="submit"
						disabled={isSubmitting}>
						Confirmar
					</Button>
				</FormActions>
			</Box>
		</ConfirmStepContainer>
	);
}
