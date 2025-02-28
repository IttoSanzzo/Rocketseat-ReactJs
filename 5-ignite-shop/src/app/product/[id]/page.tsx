import Image from "next/image";
import {
	ImageContainer,
	ProductContainer,
	ProductDetails,
} from "./styledComponents";
import { BuyButton } from "./components/BuyButton";

interface Product {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
	description: string;
	priceId: string;
}
interface ProductProps {
	params: Promise<{ id: string }>;
}

const fetchStripeProduct = async (productId: string): Promise<Product> => {
	const res = await fetch(`http://localhost:3000/api/stripe/${productId}`, {
		next: {
			revalidate: 60,
		},
	});
	return res.json();
};

export default async function Product({ params }: ProductProps) {
	const { id } = await params;
	const product = await fetchStripeProduct(id);

	return (
		<ProductContainer>
			<ImageContainer>
				<Image
					src={product.imageUrl}
					alt=""
					width={520}
					height={480}
				/>
			</ImageContainer>
			<ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>
				<p>{product.description}</p>
				<BuyButton priceId={product.priceId} />
			</ProductDetails>
		</ProductContainer>
	);
}
