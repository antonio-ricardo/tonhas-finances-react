import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from "react"
import { getNewResponse } from "../helpers/getNewResponse"
import { validateFormFields } from "../helpers/validateFormFields"
import { api } from "../services/api"
import { getCookies } from "../services/cookies"
import { useAuthenticate } from "./useAuthenticate"


type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'UNMARKED'

interface Transaction {
    id: number
    type: TransactionType
    value: number
    title: string
    date: string
    category: string
}

interface FormFields {
    value: string
    title: string
    category: string
}

interface CreateNewTransactionInput {
    event: FormEvent
    transactionType: TransactionType
}

interface TransactionContextData {
    createNewTransaction: ({ event, transactionType }: CreateNewTransactionInput) => void
    transactions: Transaction[]
}

interface TransactionProviderProps {
    children: ReactNode
}

interface IncomingTransaction {
    id: number
    type: TransactionType
    description: string
    category: string
    value: number
    userEmail: string
    receiverEmail: string
    created_at: Date
    updated_at: Date
}

const transactionsContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const { authenticate } = useAuthenticate()

    useEffect(() => {
        const defineTransactions = async () => {
            let { data, config } = await api.get('/transactions', {
                headers: {
                    authorization: `Bearer ${getCookies("tonhas-finances:acess-token")}`,
                },
            })

            if (!data) {
                return
            }

            if (data.message === 'Invalid token') {
                await authenticate()
                const newResponse = await getNewResponse(config)
                data = newResponse.data
            }

            const parsedTransactions = data ? data.map((transaction: IncomingTransaction) => {
                return {
                    id: transaction.id,
                    type: transaction.type,
                    value: transaction.value,
                    title: transaction.description,
                    date: transaction.created_at,
                    category: transaction.category,
                }
            }) : []

            setTransactions(parsedTransactions)
        }

        defineTransactions().catch(console.error)
    }, [authenticate])

    function createNewTransaction({ event, transactionType }: CreateNewTransactionInput) {
        event.preventDefault()

        const { validatedFields, hasInvalidFields } = validateFormFields<FormFields>(
            {
                fieldsName: ['category', 'title', 'value'],
                inputsClass: 'newTransactionModalFields',
                fieldsQuantity: 3
            })

        if (hasInvalidFields || transactionType === 'UNMARKED' || !validatedFields) {
            return
        }

        const newTransaction = {
            description: validatedFields.title,
            category: validatedFields.category,
            value: Number(validatedFields.value),
            type: transactionType
        }

        api.post('/transactions', newTransaction, {
            headers: {
                authorization: `Bearer ${getCookies("tonhas-finances:acess-token")}`,
            },
        }).then(() => {
            document.location.reload()
        })
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