import Image from "next/image";
import { ImageContainer, SuccessContainer } from "./styledComponents";
import Link from "next/link";

// interface SuccessProps {
// 	userName: string;
// 	imageUrl: string;
// 	productName: string;
// }

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

export default async function Success({ searchParams }: SuccessProps) {
	const sessionId = (await searchParams).session_id || "";
	const successProps = await fetchStripeSuccessProps(sessionId);
	return (
		<SuccessContainer>
			<h1>Compra Efetuada!</h1>
			<ImageContainer>
				<Image
					src={successProps.imageUrl}
					alt=""
					width={120}
					height={110}
				/>
			</ImageContainer>
			<p>
				Uhuul! <strong>{successProps.userName}</strong>, sua{" "}
				<strong>{successProps.productName}</strong> já está a caminho da sua
				casa.
			</p>
			<Link href="/">Voltar ao catálogo</Link>
		</SuccessContainer>
	);
}
