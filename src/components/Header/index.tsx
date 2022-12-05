import logo from '../../assets/logo.png'
import { Container, Content } from './styles'

export function Header () {
   return (
    <Container>
        <Content>
            <div>
                <img src={logo} alt="tonhas finances" />
                <strong>Tonhas finance$</strong>
            </div>

            <button type="button">
                Nova Transação
            </button>
        </Content>
    </Container>
   ) 
}