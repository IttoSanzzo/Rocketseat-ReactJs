import { useMemo } from "react";
import { TransactionContext } from "../context/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
	const transactions = useContextSelector(TransactionContext, (context) => {
		return context.transactions;
	});

	const summary = useMemo(() => {
		return transactions.reduce(
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
	}, [transactions]);
	return summary;
}
