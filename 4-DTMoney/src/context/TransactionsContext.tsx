import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

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
	createNewTransaction: (newTransaction: Transaction) => Promise<void>;
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

	const fetchTransactions = useCallback(async (query?: string) => {
		const response = await api.get("/transactions", {
			params: {
				_sort: "createdAt",
				_order: "desc",
				q: query,
			},
		});
		setTransactions(response.data);
	}, []);
	useEffect(() => {
		fetchTransactions();
	}, []);
	const createNewTransaction = useCallback(
		async (newTransaction: Transaction) => {
			setTransactions((state) => [...state, newTransaction]);
		},
		[]
	);

	return (
		<TransactionContext.Provider
			value={{ transactions, createNewTransaction, fetchTransactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
