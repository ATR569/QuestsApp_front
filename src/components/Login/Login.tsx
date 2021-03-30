import React from 'react'
import styles from './Login.module.css'
import RoundedButton from '../base/RoundedButton'
import Input from '../base/InputForm'

function Login() {
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
                <a href="/CadastroUsuario">Ainda não sou cadastrado...</a>
                <div className={styles.button}>
                    <RoundedButton label="Entrar" color="var(--light-yellow)" width="170px" />
                </div>
            </div>
        </div>
    )
}

export default Login
