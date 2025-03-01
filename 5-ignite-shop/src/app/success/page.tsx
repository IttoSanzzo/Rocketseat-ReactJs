import Image from "next/image";
import { ImageContainer, SuccessContainer } from "./styledComponents";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SessionProps {
	userName: string;
	imageUrl: string;
	productName: string;
}

interface SuccessProps {
	searchParams: Promise<{ session_id?: string }>;
}

async function fetchStripeSuccessProps(sessionId: string) {
	const res = await fetch(`http://localhost:3000/api/success/${sessionId}`, {
		next: {
			revalidate: 1,
		},
	});
	return res.json();
}

export const metadata = {
	title: "Sucesso | Ignite Shop",
	robots: "noindex, nofollow",
};

export default async function Success({ searchParams }: SuccessProps) {
	const sessionId = (await searchParams).session_id || "";
	if (sessionId === "") return notFound();
	const sessionProps: SessionProps = await fetchStripeSuccessProps(sessionId);
	return (
		<SuccessContainer>
			<h1>Compra Efetuada!</h1>
			<ImageContainer>
				<Image
					src={sessionProps.imageUrl}
					alt=""
					width={120}
					height={110}
				/>
			</ImageContainer>
			<p>
				Uhuul! <strong>{sessionProps.userName}</strong>, sua{" "}
				<strong>{sessionProps.productName}</strong> já está a caminho da sua
				casa.
			</p>
			<Link href="/">Voltar ao catálogo</Link>
		</SuccessContainer>
	);
}
