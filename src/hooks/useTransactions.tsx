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
    createNewTransaction: ({ event, transactionType }: CreateNewTransactionInput) => Promise<void>
    transactions: Transaction[]
    getTransactionByType: () => any
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
    const [transactionsIsFilter, setTransactionsIsFilter] = useState<boolean>(false)
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

            if (transactionsIsFilter) {
                return
            }
            setTransactions(parsedTransactions)
        }

        defineTransactions().catch(console.error)
    }, [authenticate, transactionsIsFilter])

    async function createNewTransaction({ event, transactionType }: CreateNewTransactionInput) {
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

        let { data, config } = await api.post('/transactions', newTransaction, {
            headers: {
                authorization: `Bearer ${getCookies("tonhas-finances:acess-token")}`,
            },
        })

        if (!data) {
            return document.location.reload()
        }

        if (data.message === 'Invalid token') {
            await authenticate()
            await getNewResponse(config)
        }

        document.location.reload()
    }

    async function getTransactionByType() {
        const { hasInvalidFields, validatedFields } = validateFormFields<Record<'transactionType', string>>({ fieldsName: ['transactionType'], fieldsQuantity: 1, inputsClass: 'searchTransactionInput' })

        const validTransactionType = ['ENTRADAS', 'SAIDAS']

        if (hasInvalidFields || !validatedFields || !validTransactionType.includes(validatedFields.transactionType)) {
            return
        }

        let { data, config } = await api.get('/transactions', {
            headers: {
                types: validatedFields.transactionType === 'ENTRADAS' ? 'DEPOSIT' : 'WITHDRAW',
                authorization: `Bearer ${getCookies("tonhas-finances:acess-token")}`
            }
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

        setTransactionsIsFilter(true)
    }

    return (
        <transactionsContext.Provider value={{ transactions, createNewTransaction, getTransactionByType }}>
            {children}
        </transactionsContext.Provider >
    )
}

export const useTransactions = () => {
    const context = useContext(transactionsContext)

    return context
}