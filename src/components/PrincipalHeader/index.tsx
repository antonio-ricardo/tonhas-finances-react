import logo from '../../assets/logo.png'
import { Container, Content } from './styles'


interface Props {
    onOpenNewTransactionModal: () => void
}

const imga = 'https://pbs.twimg.com/profile_images/1596308194581692416/xdDQ2ZO3_400x400.jpg'

export function PrincipalHeader({ onOpenNewTransactionModal }: Props) {
    return (
        <Container>
            <Content>
                <div>
                    <img src={logo} alt="tonhas finances" />
                    <strong>Tonhas finance$</strong>
                </div>

                <div id="profileImgDiv">
                    <img id="profileImg" src={imga} alt="show" />
                </div>

                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
            </Content>
        </Container>
    )
}