import { stripe } from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface GetParams {
	params: Promise<{ productId: string }>;
}

export async function GET(req: NextRequest, { params }: GetParams) {
	const { productId } = await params;

	try {
		const product = await stripe.products.retrieve(productId, {
			expand: ["default_price"],
		});
		const price = product.default_price as Stripe.Price;
		const formattedProduct = {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format((price.unit_amount || 1000000) / 100),
			description: product.description,
			priceId: price.id,
		};
		return NextResponse.json(formattedProduct, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching product" },
			{ status: 500 }
		);
	}
}
