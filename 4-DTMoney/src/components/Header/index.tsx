import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import igniteLogo from "../../assets/logo-ignite.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionsModal } from "../NewTransactionModal";

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img
					src={igniteLogo}
					alt="DT Money Logo"
				/>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova Transação</NewTransactionButton>
					</Dialog.Trigger>
					<NewTransactionsModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
