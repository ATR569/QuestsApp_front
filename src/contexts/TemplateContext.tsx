import { createContext, useState, ReactNode } from 'react'

export interface Template {
    page: string
}

interface TemplateContextData {
    page: string
    setPage: (page) => void
}

interface TemplateProviderProps {
    children: ReactNode
    page?: string
}

export const TemplateContext = createContext({} as TemplateContextData)

export function TemplateProvider({
    children,
    ...rest
}: TemplateProviderProps) {

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