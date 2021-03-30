import React, { Component } from 'react'
import CardContainer from '../components/base/CardContainer'
import InputForm from '../components/base/InputForm'
import RoundedButton from '../components/base/RoundedButton'
import styles from '../styles/cadastroUsuario.module.css'

export default class CadastroUsuario extends Component {

    render(): any {
        return (
            <div className={styles.container}>
                <CardContainer >
                    <div className={styles.card_container}>
                        <div className={styles.header}>
                            <label className={styles.header_text} >Cadastrar Usuário</label>
                            <div className={styles.container_img}>
                                <img src='QuestsApp-logo.svg' className={styles.img}></img>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.formulario}>
                                <InputForm label='Nome' />
                                <InputForm label='E-mail' />
                                <InputForm label='Instituição de Ensino' />

                                <div className={styles.input_password}>
                                    <InputForm label='Senha' type='password' width='70%' />
                                    <InputForm label='Confirmar senha' type='password' width='70%' />
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.btn_save}>
                                    <RoundedButton label='Salvar' color='var(--light-yellow)' width='140px' />
                                </div>
                                <div className={styles.bt_cancel}>
                                    <RoundedButton label='Cancelar' color='var(--orange)' width='140px' />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContainer>
            </div>
        )
    }
}