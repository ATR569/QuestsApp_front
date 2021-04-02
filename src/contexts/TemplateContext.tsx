import { createContext, useState, ReactNode } from 'react'

interface ITemplateContextData {
    page: string
    setPage: (page) => void
}

interface ITemplateProviderProps {
    children: ReactNode
    page?: string
}

export const TemplateContext = createContext({} as ITemplateContextData)

export function TemplateProvider({
    children,
    ...rest
}: ITemplateProviderProps) {

    const [page, setPage] = useState(rest.page ?? 'inicio')

    return (
        <TemplateContext.Provider
            value={{
                page,
                setPage,
            }}>
            {children}
        </TemplateContext.Provider>
    )
}