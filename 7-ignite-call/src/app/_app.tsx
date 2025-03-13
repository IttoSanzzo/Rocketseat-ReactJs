"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AppProps {
	children: ReactNode;
}

export function App({ children }: AppProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
