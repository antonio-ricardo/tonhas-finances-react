import logo from '../../assets/logo.png'
import { useUser } from '../../hooks/useUser'
import { Container, Content } from './styles'


interface Props {
    onOpenNewTransactionModal: () => void
}

export function PrincipalHeader({ onOpenNewTransactionModal }: Props) {
    const { user } = useUser()

    const hasProfilePhoto = !!user.photoUrl

    return (
        <Container>
            <Content hasProfilePhoto={hasProfilePhoto}>
                <div>
                    <img src={logo} alt="tonhas finances" />
                    <strong>Tonhas finance$</strong>
                </div>

                {
                    hasProfilePhoto
                        ? <div id="profileImgDiv">
                            <img id="profileImg" src={user.photoUrl} alt="show" />
                        </div>
                        : <></>
                }

                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
            </Content>
        </Container>
    )
}