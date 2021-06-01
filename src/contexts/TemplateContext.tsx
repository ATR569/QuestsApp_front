import { createContext, useState, ReactNode } from 'react'

interface ITemplateContextData {
    page: string
    changePage: (page) => void
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
    
    function changePage(page: string): void {
        setPage(page)
    }

    return (
        <TemplateContext.Provider
            value={{
                page,
                changePage,
            }}>
            {children}
        </TemplateContext.Provider>
    )
}