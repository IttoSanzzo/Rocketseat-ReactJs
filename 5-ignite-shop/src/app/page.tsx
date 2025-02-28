import ProductsCarousel, {
	product,
} from "@/components/ProductsCarousel/ProductsCarousel";

const fetchStripeProducts = async () => {
	const res = await fetch(`http://localhost:3000/api/stripe`, {
		next: {
			revalidate: 60,
		},
	});
	return res.json();
};

export default async function Home() {
	const products: product[] = await fetchStripeProducts();

	return <ProductsCarousel products={products} />;
}
