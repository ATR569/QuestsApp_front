import { createContext, useState, ReactNode } from 'react'
import { User } from '../domain/model/user'

interface IUserContextData {
    user: User,
    setUser: (user: User) => void
}

interface IUserProviderProps {
    children: ReactNode
    user: User
}

export const UserContext = createContext({} as IUserContextData)

export function UserProvider({ children, ...rest }: IUserProviderProps) {

    const [user, setUserContext] = useState(rest.user)

    function setUser(user: User): void {
        setUserContext(user)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}>
            { children}
        </UserContext.Provider>
    )
}
