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
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const confirmFormSchema = z.object({
	name: z
		.string()
		.min(3, { message: "O nome precisa conter ao menos 3 caracteres." }),
	email: z.string().email({ message: "Digite um e-mail precisa ser válido." }),
	observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
	schedulingDate: Date;
	onCancelConfirmation: () => void;
}

export default function ConfirmStep({
	schedulingDate,
	onCancelConfirmation,
}: ConfirmStepProps) {
	const router = useRouter();
	const params = useParams();
	const username = params.name;

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(confirmFormSchema),
	});

	async function handleConfirmScheduling(data: ConfirmFormData) {
		const { name, email, observations } = data;

		await api.post(`/users/${username}/schedule`, {
			name,
			email,
			observations,
			date: schedulingDate,
		});

		onCancelConfirmation();
	}

	const describedDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
	const describedTime = dayjs(schedulingDate).format("HH:mm[h]");

	return (
		<ConfirmStepContainer onSubmit={handleSubmit(handleConfirmScheduling)}>
			<Box>
				<FormHeader>
					<Text>
						<CalendarBlank />
						{describedDate}
					</Text>
					<Text>
						<Clock />
						{describedTime}
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
						onClick={onCancelConfirmation}
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
