"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import "../lib/dayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

interface AppProps {
	children: ReactNode;
}

export function App({ children }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>{children}</SessionProvider>;
		</QueryClientProvider>
	);
}
