import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from "react"
import { checkIfNewTransactionModalFieldsIsEmpty } from "../helpers/checkIfNewTransactionModalFieldsIsEmpty"
import { api } from "../services/api"


type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'UNMARKED'

interface Transaction {
    id: number
    type: TransactionType
    value: number
    title: string
    date: string
    category: string
}

interface CreateNewTransactionInput {
    event: FormEvent
    transactionType: TransactionType
    handleCloseNewTransactionModal: () => void
}

interface TransactionContextData {
    createNewTransaction: ({ event, transactionType, handleCloseNewTransactionModal }: CreateNewTransactionInput) => void
    transactions: Transaction[]
}

interface TransactionProviderProps {
    children: ReactNode
}

const transactionsContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions').then((response) => setTransactions(response.data ?? []))
    }, [])

    function createNewTransaction({ event, transactionType, handleCloseNewTransactionModal }: CreateNewTransactionInput) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        const hasEmptyField = checkIfNewTransactionModalFieldsIsEmpty(data)

        if (hasEmptyField || transactionType === 'UNMARKED') {
            return
        }

        const newTransaction = { id: 2, ...data, value: Number(data.value), type: transactionType, date: String(new Date()) } as Transaction

        setTransactions([...transactions, newTransaction])

        handleCloseNewTransactionModal()
    }


    return (
        <transactionsContext.Provider value={{ transactions, createNewTransaction }}>
            {children}
        </transactionsContext.Provider >
    )
}

export const useTransactions = () => {
    const context = useContext(transactionsContext)

    return context
}