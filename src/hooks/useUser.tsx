import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { getNewResponse } from "../helpers/getNewResponse"
import { api } from "../services/api"
import { getCookies } from "../services/cookies"
import { useAuthenticate } from "./useAuthenticate"

interface User {
    name: string
    photoUrl?: string
}

interface UserContextDate {
    user: User
}

interface UserProviderProps {
    children: ReactNode
}

const userContext = createContext<UserContextDate>({} as UserContextDate)

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({} as User)
    const { authenticate } = useAuthenticate()

    useEffect(() => {
        const defineUser = async () => {
            let { data, config } = await api.get('/users', {
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

            setUser({ name: data.name, photoUrl: data.photoUrl })
        }

        defineUser().catch(console.error)
    }, [authenticate])



    return (
        <userContext.Provider value={{ user }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    const useUser = useContext(userContext)

    return useUser
}