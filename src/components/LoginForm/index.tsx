import { Container } from "./styles";
import avatar from '../../assets/avatar.png'
import { FormEvent } from "react";
import { api } from "../../services/api";
import { validateFormFields } from "../../helpers/validateFormFields";
import { useNavigate } from "react-router-dom";
import { setCookies } from "../../services/cookies";

interface LoginInfo {
    name: string
    password: string
}

export function LoginForm() {
    const navigate = useNavigate();

    async function handleLogUser(event: FormEvent) {
        event.preventDefault()

        const { validatedFields, hasInvalidFields } = validateFormFields<LoginInfo>({ inputsClass: 'loginInput', fieldsQuantity: 2, fieldsName: ['email', 'password'] })

        if (hasInvalidFields || !validatedFields) {
            return
        }

        try {
            const { data } = await api.post('/users/login', { ...validatedFields })

            const today = new Date()

            const expires = new Date(today.setDate(today.getDate() + 1))

            await setCookies({
                cookieNames: ['tonhas-finances:acess-token', 'tonhas-finances:refresh-token'],
                value: { 'tonhas-finances:acess-token': data.acessToken, 'tonhas-finances:refresh-token': data.refreshToken },
                options: { path: '/', expires }
            })

            return navigate("/dashboard")
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    return (
        <Container>

            <form onSubmit={async (event) => await handleLogUser(event)}>

                <div id='loginImageDiv'>
                    <img src={avatar} alt="" />
                </div>

                <div id='loginInputsDiv'>
                    <input className="loginInput" type="text" name="email" placeholder="Email" />

                    <input className="loginInput" type="password" name="password" placeholder="Senha" />

                    <a href="./">Esqueceu sua senha ?</a>
                </div>

                <div id='loginButtonsDiv'>
                    <button type='submit'>Login</button>
                    <button type='button' onClick={() => navigate('/singup')}>Cadastre-se</button>
                </div>

            </form>

        </Container>
    )
}