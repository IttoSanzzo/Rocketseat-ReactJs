import { Heading } from "@/components/DesignSystem/Heading";
import { Text } from "@/components/DesignSystem/Text";
import { Hero, HomeContainer, Preview } from "./styledComponents";
import previewImage from "@/assets/app-preview.png";
import Image from "next/image";
import ClaimUsernameForm from "./components/ClaimUsernameForm";
import { NextSeo } from "next-seo";

export default function Home() {
	return (
		<>
			<NextSeo
				title="Descomplique sua agenda | Ignite Call"
				description="Conecte seu calendário e permita que as pessoas marquem agendamentos
						no seu tempo livre."
			/>
			<HomeContainer>
				<Hero>
					<Heading
						as="h1"
						size="4xl">
						Agendamento Descomplicado
					</Heading>
					<Text size="xl">
						Conecte seu calendário e permita que as pessoas marquem agendamentos
						no seu tempo livre.
					</Text>
					<ClaimUsernameForm />
				</Hero>
				<Preview>
					<Image
						src={previewImage}
						alt="Calendário simbolizando aplicação em funcionamento"
						height={400}
						quality={100}
						priority
					/>
				</Preview>
			</HomeContainer>
		</>
	);
}
