"use client";

interface BuyButtonProps {
	priceId: string;
}

export function BuyButton({ priceId }: BuyButtonProps) {
	async function handleBuyProduct() {
		try {
			const response = await fetch(`http://localhost:3000/api/checkout`, {
				method: "POST",
				body: JSON.stringify({ priceId: priceId }),
			});
			const { checkoutUrl } = await response.json();
			window.location.href = checkoutUrl;
		} catch (error) {
			console.log("Falha ao redirecionar o checkout");
		}
	}
	return <button onClick={handleBuyProduct}>Comprar Agora</button>;
}
