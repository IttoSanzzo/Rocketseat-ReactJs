"use client";

import {
	AuthError,
	ConnectBox,
	ConnectCalendarContainer,
	ConnectItem,
	Header,
} from "./styledComponents";
import { Box } from "@/components/DesignSystem/Box";
import { Text } from "@/components/DesignSystem/Text";
import { Button } from "@/components/DesignSystem/Button";
import { Heading } from "@/components/DesignSystem/Heading";
import { MultiStep } from "@/components/DesignSystem/MultiStep";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { NextSeo } from "next-seo";

async function handleConnectCalendar() {
	await signIn("google");
}

export default function ConnectCalendar() {
	const session = useSession();
	const router = useRouter();
	const isAuthenticated = session.status === "authenticated";
	console.log(session.status);
	const searchParams = useSearchParams();
	const hasAuthError = !!searchParams.get("error");

	console.log(session);

	function handleNavigateToNextStep() {
		router.push("http://localhost:3000/register/time-intervals");
	}

	return (
		<>
			<NextSeo
				title="Conecte sua agenda do Google | Ignite Call"
				noindex
			/>
			<ConnectCalendarContainer>
				<Header>
					<Heading as="strong">Conecte sua agenda!</Heading>
					<Text>
						Conecte o seu calendário para verificar automaticamente as horas
						ocupadas e os novos eventos à medida em que são agendados.
					</Text>

					<MultiStep
						size={4}
						currentStep={2}
					/>
				</Header>

				<ConnectBox>
					<Box>
						<ConnectItem>
							<Text>Google Calendar</Text>
							<Button
								onClick={handleConnectCalendar}
								variant={isAuthenticated ? "primary" : "secondary"}
								disabled={isAuthenticated}
								size="sm">
								{isAuthenticated ? (
									<>
										Conectado
										<Check />
									</>
								) : (
									<>
										Conectar
										<ArrowRight />
									</>
								)}
							</Button>
						</ConnectItem>

						{hasAuthError && (
							<AuthError>
								<Text size="sm">
									Falha ao se conectar ao Google, verifique se você habilitou as
									permissões de acesso ao Google Calendar.
								</Text>
							</AuthError>
						)}

						<Button
							type="submit"
							onClick={handleNavigateToNextStep}
							disabled={!isAuthenticated || hasAuthError}>
							Próximo Passo
							<ArrowRight />
						</Button>
					</Box>
				</ConnectBox>
			</ConnectCalendarContainer>
		</>
	);
}
