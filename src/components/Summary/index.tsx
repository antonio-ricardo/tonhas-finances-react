import { Container } from "./styles";

import expense from '../../assets/expense.png'
import income from '../../assets/income.png'
import cifrao from '../../assets/cifrao.png'
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {

    const { transactions } = useTransactions()

    const { incomes, expenses, total } = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'DEPOSIT') {
            acc.incomes += transaction.value
            acc.total += transaction.value
        }

        if (transaction.type === 'WITHDRAW') {
            acc.expenses += transaction.value
            acc.total -= transaction.value
        }

        return acc
    }, { incomes: 0, expenses: 0, total: 0 })

    return (
        <Container>
            <div>
                <header>

                    <p>Entradas</p>
                    <img src={expense} alt="" />

                </header>

                <strong>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incomes)
                    }
                </strong>

            </div>

            <div>
                <header>

                    <p>Saidas</p>
                    <img src={income} alt="" />

                </header>

                <strong>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(expenses)
                    }
                </strong>

            </div>

            <div className={total >= 0 ? "total" : "negativeTotal"}>
                <header>

                    <p>Total</p>
                    <img src={cifrao} alt="" />

                </header>

                <strong>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(total)
                    }
                </strong>

            </div>
        </Container>
    )
}