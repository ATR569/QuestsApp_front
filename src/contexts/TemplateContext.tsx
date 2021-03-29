import { createContext, useState, ReactNode } from 'react'

export interface Template {
    title: string
    subTitle: string
    path: string
    iconSrc: string
}

interface TemplateContextData {
    title: string
    subTitle: string
    iconSrc: string
    path: string
    setTitle: (title) => void
    setSubTitle: (subTitle) => void
    setIconSrc: (iconSrc) => void
    setPath: (path) => void
}

interface TemplateProviderProps {
    children: ReactNode
    title?: string
    subTitle?: string
    iconSrc?: string
    path?: string
}

export const TemplateContext = createContext({} as TemplateContextData)

export function TemplateProvider({
    children,
    ...rest
}: TemplateProviderProps) {
    const [title, setTitle] = useState(rest.title ?? 'Título da Página')
    const [subTitle, setSubTitle] = useState(rest.subTitle ?? 'Subtítulo da Página')
    const [iconSrc, setIconSrc] = useState(rest.iconSrc ?? '')
    const [path, setPath] = useState(rest.path ?? '/')

    return (
        <TemplateContext.Provider
            value={{
                title,
                subTitle,
                iconSrc,
                path,
                setTitle,
                setSubTitle,
                setIconSrc,
                setPath,
            }}>
            {children}
        </TemplateContext.Provider>
    )
}