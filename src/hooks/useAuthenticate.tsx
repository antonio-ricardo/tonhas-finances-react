import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { getCookies, removeCookies, setCookies } from "../services/cookies";

interface RefreshTokenResponse {
  acessToken: string
  refreshToken: string
}

interface AuthenticateContextData {
  authenticate: (navigateTo?: string) => Promise<void>
  logOut: () => Promise<void>
}

interface AuthenticaProviderProps {
  children: ReactNode;
}

const AuthenticateContext = createContext<AuthenticateContextData>(
  {} as AuthenticateContextData
)

export function AuthenticateProvider({ children }: AuthenticaProviderProps): JSX.Element {
  const navigate = useNavigate()

  async function authenticate(navigateTo?: string) {
    try {
      const refreshToken = getCookies("tonhas-finances:refresh-token");

      if (!refreshToken) {
        await removeCookies({
          cookieNames: ['tonhas-finances:acess-token']
        })

        return navigate('/login')
      }

      const { data, status } = await api.post<RefreshTokenResponse>("/users/refresh", { refreshToken })

      if (status === 401) {
        await removeCookies({
          cookieNames: ['tonhas-finances:refresh-token']
        })

        return navigate('/login')
      }

      const today = new Date();

      const expires = new Date(today.setDate(today.getDate() + 1));

      await setCookies({
        cookieNames: [
          "tonhas-finances:acess-token",
          "tonhas-finances:refresh-token",
        ],
        value: {
          "tonhas-finances:acess-token": data.acessToken,
          "tonhas-finances:refresh-token": data.refreshToken,
        },
        options: { path: "/", expires },
      })

      if (navigateTo) {
        navigate(navigateTo)
      }
    } catch (error) {
      throw new Error()
    }
  }

  async function logOut() {
    removeCookies({ cookieNames: ['tonhas-finances:acess-token', 'tonhas-finances:refresh-token'] })

    navigate('/login')
  }

  return (
    <AuthenticateContext.Provider value={{ authenticate, logOut }}>
      {children}
    </AuthenticateContext.Provider>
  )
}

export const useAuthenticate = () => {
  const context = useContext(AuthenticateContext)

  return context
}