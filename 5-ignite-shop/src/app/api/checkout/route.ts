import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "", {
	apiVersion: "2025-02-24.acacia",
	appInfo: {
		name: "Ignite Shop",
	},
});

export async function POST(req: Request) {
	try {
		const priceId = "price_1QwcSlGXlhPL5Uisn0zkL5uF";
		const checkoutSession = await stripe.checkout.sessions.create({
			success_url: `${process.env.NEXT_URL}/success`,
			cancel_url: `${process.env.NEXT_URL}/`,
			mode: "payment",
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
		});
		return NextResponse.json(
			{ checkoutUrl: checkoutSession.url },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Error at checkout" }, { status: 500 });
	}
}
