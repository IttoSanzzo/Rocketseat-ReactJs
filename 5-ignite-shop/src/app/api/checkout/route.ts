import { stripe } from "@/app/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { priceId } = body;
		const checkoutSession = await stripe.checkout.sessions.create({
			success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
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
