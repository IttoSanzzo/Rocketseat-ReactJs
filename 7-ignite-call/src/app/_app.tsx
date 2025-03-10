import { ReactNode } from "react";
// import { Container, Header } from "@/styles/_App/styledComponents";
// import Image from "next/image";
// import LogoShop from "@/assets/LogoShop.svg";

interface AppProps {
	children: ReactNode;
}

export function App({ children }: AppProps) {
	return (
		<>{children}</>
		// <Container>
		// <Header>
		// <Image
		// src={LogoShop}
		// alt=""
		// />
		// </Header>
		// {children}
		// </Container>
	);
}
