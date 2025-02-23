import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

export interface Transaction {
	id: number;
	description: string;
	type: "income" | "outcome";
	price: number;
	category: string;
	createdAt: string;
}
interface TransactionContextType {
	transactions: Transaction[];
	createNewTransaction: (newTransaction: Transaction) => void;
	fetchTransactions: (query?: string) => Promise<void>;
}
interface TransactionProviderProps {
	children: ReactNode;
}

export const TransactionContext = createContext<TransactionContextType>(
	{} as TransactionContextType
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	async function fetchTransactions(query?: string) {
		const response = await api.get("/transactions", {
			params: {
				_sort: "createdAt",
				_order: "desc",
				q: query,
			},
		});
		setTransactions(response.data);
	}
	useEffect(() => {
		fetchTransactions();
	}, []);
	function createNewTransaction(newTransaction: Transaction) {
		setTransactions((state) => [...state, newTransaction]);
	}

	return (
		<TransactionContext.Provider
			value={{ transactions, createNewTransaction, fetchTransactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
