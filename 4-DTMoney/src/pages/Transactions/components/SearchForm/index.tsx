import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../../context/TransactionsContext";

const searchFormSchema = zod.object({
	query: zod.string(),
});
type SeachFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm() {
	const { fetchTransactions } = useContext(TransactionContext);
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SeachFormInputs>({
		resolver: zodResolver(searchFormSchema),
	});

	async function handleSearchTransaction(data: SeachFormInputs) {
		await fetchTransactions(data.query);
	}

	return (
		<SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
			<input
				type="text"
				placeholder="Busque por transações"
				{...register("query")}
			/>
			<button
				type="submit"
				disabled={isSubmitting}>
				<MagnifyingGlass size={20} />
				Buscar
			</button>
		</SearchFormContainer>
	);
}
