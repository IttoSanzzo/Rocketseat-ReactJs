import * as Dialog from "@radix-ui/react-dialog";
import {
	CloseButton,
	Content,
	Overlay,
	TransactionIncomeTypeButton,
	TransactionOutcomeTypeButton,
	TransactionType,
} from "./styles";
import * as zod from "zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../context/TransactionsContext";
import { useContext } from "react";
import { api } from "../../lib/axios";

const newTransactionFormSchema = zod.object({
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(["income", "outcome"]),
});
type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionsModal() {
	const { createNewTransaction } = useContext(TransactionContext);
	const {
		reset,
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<NewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: { type: "income" },
	});

	async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
		const { description, price, category, type } = data;
		const response = await api.post("/transactions", {
			price: price,
			type: type,
			category: category,
			description: description,
			createdAt: new Date(),
		});
		reset();
		createNewTransaction(response.data);
	}

	return (
		<Dialog.Portal>
			<Overlay />
			<Content>
				<Dialog.Title>Nova Transação</Dialog.Title>
				<CloseButton>
					<X size={24} />
				</CloseButton>
				<form
					action=""
					onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register("description")}
					/>
					<input
						type="text"
						placeholder="Preço"
						required
						{...register("price", { valueAsNumber: true })}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register("category")}
					/>

					<Controller
						control={control}
						name="type"
						render={({ field }) => {
							return (
								<TransactionType
									onValueChange={field.onChange}
									value={field.value}>
									<TransactionIncomeTypeButton value="income">
										<ArrowCircleUp size={24} />
										Entrada
									</TransactionIncomeTypeButton>
									<TransactionOutcomeTypeButton value="outcome">
										<ArrowCircleDown size={24} />
										Saída
									</TransactionOutcomeTypeButton>
								</TransactionType>
							);
						}}
					/>
					<button
						type="submit"
						disabled={isSubmitting}>
						Cadastrar
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	);
}
