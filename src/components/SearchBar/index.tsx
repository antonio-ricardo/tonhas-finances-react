import { Container } from "./styles";

import searchImage from '../../assets/search.png'
import { useTransactions } from "../../hooks/useTransactions";



export function SearchBar() {
    const { getTransactionByType } = useTransactions()


    return (
        <Container>
            <input type="text" name="transactionType" className="searchTransactionInput" placeholder="Procurar transação por tipo (ENTRADAS, SAIDAS)" />

            <button type="button" onClick={getTransactionByType}> <img src={searchImage} alt="" /> Procurar</button>
        </Container>
    )
}