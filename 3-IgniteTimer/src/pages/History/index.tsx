import { useContext } from "react";
import { ptBR } from "date-fns/locale";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";

export function History() {
	const { cyclesState } = useContext(CyclesContext);

	return (
		<HistoryContainer>
			<h1>Meu Histórico</h1>
			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cyclesState.cycles.map((cycle) => {
							return (
								<tr>
									<td>{cycle.task}</td>
									<td>{cycle.minutesAmount} minutos</td>
									<td>
										{formatDistanceToNow(cycle.startDate, {
											locale: ptBR,
											addSuffix: true,
										})}
									</td>
									<td>
										{cycle.finishedDate ? (
											<Status statusColor="green">Concluído</Status>
										) : cycle.interruptedDate ? (
											<Status statusColor="red">Interrompido</Status>
										) : (
											<Status statusColor="yellow">Em andamento</Status>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
