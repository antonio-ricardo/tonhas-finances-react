import { Container } from "./styles";
import avatar from '../../assets/avatar.png'
import { FormEvent } from "react";
import { api } from "../../services/api";
import { validateFormFields } from "../../helpers/validateFormFields";
import { useNavigate } from "react-router-dom";
import { setCookies } from "../../services/cookies";

interface SingUpInfo {
    name: string
    password: string
    confirmPassword: string
    email: string
    photoUrl?: string
}

export function SingUpForm() {
    const navigate = useNavigate();

    async function handleSingUpUser(event: FormEvent) {
        event.preventDefault()

        const { validatedFields, hasInvalidFields } = validateFormFields<SingUpInfo>({ inputsClass: 'singUpInput', fieldsQuantity: 5, fieldsName: ['email', 'password', 'confirmPassword', 'name'], optionalFieldsName: ['photoUrl'] })
        
        if (hasInvalidFields || !validatedFields) {
            return
        }

        if (validatedFields.confirmPassword !== validatedFields.password) {
            return
        }

        try {
            const { data } = await api.post('/users', { ...validatedFields })

            const today = new Date()

            const expires = new Date(today.setDate(today.getDate() + 1))

            await setCookies({
                cookieNames: ['tonhas-finances:acess-token', 'tonhas-finances:refresh-token'],
                value: { 'tonhas-finances:acess-token': data.acessToken, 'tonhas-finances:refresh-token': data.refreshToken },
                options: { path: '/', expires }
            })

            return navigate("/dashboard")
        } catch (error) {
            throw new Error()
        }
    }

    return (
        <Container>

            <form onSubmit={async (event) => await handleSingUpUser(event)}>

                <div id='singUpImageDiv'>
                    <img src={avatar} alt="" />
                </div>

                <div id='singUpInputsDiv'>
                    <input className="singUpInput" type="text" name="name" placeholder="Nome *"/>

                    <input className="singUpInput" type="text" name="email" placeholder="Email *" />

                    <input className="singUpInput" type="password" name="password" placeholder="Senha *" />

                    <input className="singUpInput" type="password" name="confirmPassword" placeholder="Confirmar Senha *" />

                    <input className="singUpInput" type="text" name="photoUrl" placeholder="Link da foto" />

                    <a href="./">Esqueceu sua senha ?</a>
                </div>

                <div id='singUpButtonsDiv'>
                    <button type="submit">Confirmar</button>
                    <button type="button" onClick={() => navigate('/login')}>Voltar</button>
                </div>

            </form>

        </Container>
    )
}