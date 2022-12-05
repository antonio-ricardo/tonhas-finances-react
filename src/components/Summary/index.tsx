import { Container } from "./styles";

import expense from '../../assets/expense.png'
import income from '../../assets/income.png'
import dolar from '../../assets/dolar.png'

export function Summary() {
    return (
        <Container>
            <div>
                <header>

                <p>Entradas</p>
                <img src={expense} alt="" />

                </header>

                <strong>R$ 17.400,00</strong>

            </div>

            <div>
                <header>

                <p>Saidas</p>
                <img src={income} alt="" />
                
                </header>

                <strong>R$ 1.000,00</strong>

            </div>

            <div className="total">
                <header>

                <p>Total</p>
                <img src={dolar} alt="" />
                
                </header>

                <strong>R$ 16.400,00</strong>

            </div>
        </Container>
    )
}