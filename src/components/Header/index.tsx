import logo from '../../assets/logo.png'
import { Container, Content } from './styles'


interface Props {
    onOpenNewTransactionModal: () => void
}

export function Header({onOpenNewTransactionModal}: Props) {
    return (
        <Container>
            <Content>
                <div>
                    <img src={logo} alt="tonhas finances" />
                    <strong>Tonhas finance$</strong>
                </div>

                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
            </Content>
        </Container>
    )
}