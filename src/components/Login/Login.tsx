import React, { useContext } from 'react'
import styles from './Login.module.css'
import RoundedButton from '../base/RoundedButton'
import Input from '../base/InputForm'
import { SignContext } from '../../contexts/SignContext'
import  {AuthService}  from '../../services/auth'
import { useRouter } from 'next/router'

function Login() {
    const { toggleMode } = useContext(SignContext)
    const router = useRouter()

    function login(evt: MouseEvent) : void {
        evt.preventDefault()
        // TO DO
        AuthService.storeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
        router.reload()
    }

    function changeToCreateMode(evt): void {
        evt.preventDefault()
        toggleMode()
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
            </div>
            <div className={styles.form}>
                <Input label="E-mail" type="text" width="220px" />
                <Input label="Senha" type="password" />
            </div>
            <div className={styles.footer}>
                <img src="/login-background.svg" alt="" />
                <a href="#" onClick={ changeToCreateMode }>Ainda não sou cadastrado...</a>
                <div className={styles.button}>
                    <RoundedButton 
                        label="Entrar" 
                        color="var(--light-yellow)" 
                        width="170px" 
                        onClick={login}/>
                </div>
            </div>
        </div>
    )
}

export default Login
