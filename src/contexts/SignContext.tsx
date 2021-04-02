import { createContext, useState, ReactNode } from 'react'

export enum Mode {
    LOGIN,
    CREATE 
}

interface ISignContextData {
    mode: Mode,
    toggleMode: () => void
}

interface ISignProviderProps {
    children: ReactNode
    mode: Mode
}

export const SignContext = createContext({} as ISignContextData)

export function SignProvider({children, ...rest}: ISignProviderProps) {

    const [mode, setMode] = useState(rest.mode)

    function toggleMode() : void {
        setMode(mode === Mode.LOGIN ? Mode.CREATE : Mode.LOGIN)
    }

    return (
        <SignContext.Provider 
            value={{
                mode,
                toggleMode,
            }}>
            { children }
        </SignContext.Provider>
    )
}