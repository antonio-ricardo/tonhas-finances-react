import { useTransactions } from "../../hooks/useTransactions";
import { TransactionTableTr } from "../TransactionTableTr";
import { Container } from "./styles";

export function TransactionTable() {

    const { transactions } = useTransactions()

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>

                    {transactions ? transactions.map((transaction) => {
                        return (
                            <TransactionTableTr
                                key={transaction.id}
                                date={transaction.date}
                                title={transaction.title}
                                type={transaction.type}
                                category={transaction.category}
                                value={transaction.value}
                            />
                        )
                    }) : <></>}

                </tbody>
            </table>
        </Container>
    )
}