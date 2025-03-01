import { stripe } from "@/app/lib/stripe";
import Product from "@/app/product/[id]/page";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface GetParams {
	params: Promise<{ sessionId: string }>;
}

export async function GET(req: NextRequest, { params }: GetParams) {
	try {
		const { sessionId } = await params;
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ["line_items", "line_items.data.price.product"],
		});
		const product = session.line_items?.data[0].price
			?.product as Stripe.Product;
		const formattedSession = {
			id: session.id,
			userName: session.customer_details?.name,
			productName: product.name,
			imageUrl: product.images[0],
		};
		return NextResponse.json(formattedSession, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error at sucess page fetch" },
			{ status: 500 }
		);
	}
}
