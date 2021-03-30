import React from 'react'
import styles from './Login.module.css'
import RoundedButton from '../base/RoundedButton'
import Input from '../base/InputForm'

function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.logo}>
                    <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
                </div>
                <div className={styles.form}>
                    <Input label="E-mail" type="text"/>
                    <Input label="Senha" type="password"/>
                </div>
                <div className={styles.footer}>
                    <img src="/login-background.svg" alt="" />
                    <span>Ainda não sou cadastrado...</span>
                    <div className={styles.button}>
                        <RoundedButton label="Entrar" color="var(--light-yellow)" width="170px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
