import ReactModal from "react-modal";
import { Container } from "./styles";

import incomingIcon from '../../assets/income.png'
import expenseIcon from '../../assets/expense.png'
import closeIcon from '../../assets/close.png'
import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";


interface Props {
    isNewTransactionModalIsOpen: boolean
    handleCloseNewTransactionModal: () => void
}

type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'UNMARKED'

export function NewTransactionModal({ handleCloseNewTransactionModal, isNewTransactionModalIsOpen }: Props) {

    const [transactionType, setTransactionType] = useState<TransactionType>('UNMARKED')

    const { createNewTransaction } = useTransactions()

    function handleSelectTransactionType(selectedType: TransactionType) {
        if (selectedType === transactionType) {
            return
        }

        setTransactionType(selectedType)
    }

    return (
        <ReactModal
            isOpen={isNewTransactionModalIsOpen}
            onRequestClose={handleCloseNewTransactionModal}
            className='newTransactionModalContent'
            overlayClassName='newTransactionModalOverlay'
        >

            <Container>
                <button type="button" id="closeModalButton">
                    <img src={closeIcon} alt="closeModalImg" onClick={handleCloseNewTransactionModal} />
                </button>

                <form onSubmit={(event) => createNewTransaction({ event, transactionType, handleCloseNewTransactionModal })}>

                    <h1>Nova transação</h1>

                    <div id='modalTextInputsContainer'>

                        <input type="text" id='formTitleInput' name="title" placeholder="Descrição" />
                        <input type="number" id='formValueInput' name="value" placeholder="Preço" />
                        <input type="text" id='formCategoryInput' name="category" placeholder="Categoria" />

                    </div>

                    <div id='modalButtonsContainer'>

                        <button type='button' className={transactionType === 'DEPOSIT' ? 'markedDepositButton' : ''} onClick={() => handleSelectTransactionType('DEPOSIT')}><img src={incomingIcon} alt="" />Entrada</button>
                        <button type='button' className={transactionType === 'WITHDRAW' ? 'markedWithdrawButton' : ''} onClick={() => handleSelectTransactionType('WITHDRAW')}><img src={expenseIcon} alt="" />Saída</button>

                    </div>

                    <button type="submit">Cadastrar</button>

                </form>

            </Container>

        </ReactModal>
    )
}