import { Container } from "./styles";
import logo from '../../assets/logo.png'


export function Header() {
    return (
        <Container>
            <img src={logo} alt="tonhas finances" />
            <h1>Tonhas finance$</h1>
            <img src={logo} alt="tonhas finances" />
        </Container>
    )
}