import React, { useContext } from 'react'
import { SignContext, Mode } from '../../contexts/SignContext'
import Login from '../Login/Login'
import CadastroUsuario from '../CadastroUsuario/CadastroUsuario'

export default function SignPage() {
    const { mode } = useContext(SignContext)

    return (
        <div>
            {mode === Mode.LOGIN ? <Login /> : <CadastroUsuario />}
        </div>
    )
}