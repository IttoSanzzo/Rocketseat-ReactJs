"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductsContainer } from "./styledComponents";

export interface product {
	id: string;
	imageUrl: string;
	name: string;
	price: number | null;
}
interface productsCarouselProps {
	products: product[];
}

export default function ProductsCarousel({ products }: productsCarouselProps) {
	const [sliderRef] = useKeenSlider({
		slides: { perView: 3, spacing: 48 },
	});

	return (
		<ProductsContainer
			ref={sliderRef}
			className="keen-slider">
			{products.map((product) => {
				return (
					<Link
						key={product.id}
						href={`/product/${product.id}`}>
						<Product className="keen-slider__slide">
							<Image
								src={product.imageUrl}
								alt=""
								width={520}
								height={480}
							/>
							<footer>
								<strong>{product.name}</strong>
								<span>{product.price}</span>
							</footer>
						</Product>
					</Link>
				);
			})}
		</ProductsContainer>
	);
}
