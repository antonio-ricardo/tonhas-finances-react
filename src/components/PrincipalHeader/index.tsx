import logo from '../../assets/logo.png'
import config from '../../assets/config.png'

import { useUser } from '../../hooks/useUser'
import { Container, Content } from './styles'
import { useState } from 'react'
import { useAuthenticate } from '../../hooks/useAuthenticate'


interface Props {
    onOpenNewTransactionModal: () => void
}

export function PrincipalHeader({ onOpenNewTransactionModal }: Props) {
    const { user } = useUser()
    const { logOut } = useAuthenticate()
    const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false)

    const hasProfilePhoto = !!user.photoUrl

    function handleCloseOrOpenOptions() {
        setIsOpenOptions(!isOpenOptions)
    }

    return (
        <Container>
            <Content hasProfilePhoto={hasProfilePhoto} isOpenOptions={isOpenOptions}>
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

                <div id="principalHeaderConfigButtonDiv" onClick={handleCloseOrOpenOptions}>
                    <button type='button'>
                        <img src={config} alt="" />
                    </button>
                </div>

                <button type="button" className='principalHeaderConfigOptions' onClick={logOut}>Logout</button>
            </Content>
        </Container>
    )
}