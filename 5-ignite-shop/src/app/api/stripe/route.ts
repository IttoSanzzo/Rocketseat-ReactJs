import { stripe } from "@/app/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
	try {
		const products = await stripe.products.list({
			expand: ["data.default_price"],
		});
		const formattedProducts = products.data.map((product) => {
			const price = product.default_price as Stripe.Price;

			return {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat("pt-BR", {
					style: "currency",
					currency: "BRL",
				}).format((price.unit_amount || 1000000) / 100),
			};
		});
		return NextResponse.json(formattedProducts, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching products" },
			{ status: 500 }
		);
	}
}
