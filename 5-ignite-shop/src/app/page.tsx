import Stripe from "stripe";
import ProductsCarousel, {
	product,
} from "@/components/ProductsCarousel/ProductsCarousel";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
	apiVersion: "2025-02-24.acacia",
	appInfo: {
		name: "Ignite Shop",
	},
});
const fetchStripe = async () => {
	return (
		await stripe.products.list({
			expand: ["data.default_price"],
		})
	).data.map((product) => {
		const defaultPrice = product.default_price as Stripe.Price;
		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: defaultPrice.unit_amount,
		};
	});
};

export default async function Home() {
	const products: product[] = await fetchStripe();

	return <ProductsCarousel products={products} />;
}
