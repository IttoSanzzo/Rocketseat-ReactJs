"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import "../lib/dayjs";

interface AppProps {
	children: ReactNode;
}

export function App({ children }: AppProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
