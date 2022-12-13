import { Container } from "./styles";

interface Props {
    type: string
    value: number
    title: string
    date: string
    category: string
}

export function TransactionTableTr(props: Props) {
    return (
        <Container>
            <td>
                {props.title}
            </td>

            <td className={props.type}>
                {
                    Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(props.value)
                }
            </td>

            <td>
                {props.category}
            </td>

            <td>
                {
                    Intl.DateTimeFormat('pt-BR').format(new Date(props.date))
                }
            </td>

        </Container>
    )
}