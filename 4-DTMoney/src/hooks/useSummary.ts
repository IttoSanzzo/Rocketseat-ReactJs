import { useContext } from "react";
import { TransactionContext } from "../context/TransactionsContext";

export function useSummary() {
	const { transactions } = useContext(TransactionContext);
	const summary = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === "income") {
				acc.totalIncome += transaction.price;
				acc.totalFinalDifference += transaction.price;
			} else {
				acc.totalOutcome += transaction.price;
				acc.totalFinalDifference -= transaction.price;
			}
			return acc;
		},
		{
			totalIncome: 0,
			totalOutcome: 0,
			totalFinalDifference: 0,
		}
	);
	return summary;
}
