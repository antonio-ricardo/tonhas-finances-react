import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { LoginForm } from "../../components/LoginForm";
import { useAuthenticate } from "../../hooks/useAuthenticate";
import { getCookies } from "../../services/cookies";
import { Container } from "./styles";


export function LoginScreen() {
    const navigate = useNavigate()
    const { authenticate } = useAuthenticate()


    useEffect(() => {
        async function checkIfIsAuthenticated() {
            const acessToken = getCookies('tonhas-finances:acess-token')
            const refreshToken = getCookies('tonhas-finances:refresh-token')

            if (acessToken) {
                return navigate('/dashboard')
            }

            if (refreshToken) {
                await authenticate('/dashboard')
            }
        }


        checkIfIsAuthenticated()

    }, [navigate, authenticate])

    return (
        <Container>

            <Header />

            <LoginForm />

        </Container>
    )
}