import { Container } from "./styles";

import searchImage from '../../assets/search.png'



export function SearchBar() {
    return (
        <Container>
            <input type="text" placeholder="Procurar transação" />
            
            <button type="button"> <img src={searchImage} alt=""/> Procurar</button>
        </Container>
    )
}