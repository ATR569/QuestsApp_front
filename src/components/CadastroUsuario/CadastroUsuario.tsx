import React, { useContext } from 'react'
import CardContainer from '../base/CardContainer'
import InputForm from '../base/InputForm'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import styles from './CadastroUsuario.module.css'
import { SignContext } from '../../contexts/SignContext'

export default function CadastroUsuario() {
    const { toggleMode } = useContext(SignContext)

    function save(e: MouseEvent): void {
        e.preventDefault()
        // TO DO
        toggleMode()
    }

    function cancel(e: MouseEvent): void {
        e.preventDefault()
        toggleMode()
    }

    function renderButtons(): any {
        return (
            <div className={styles.buttons}>
                <div className={styles.bt_cancel}>
                    <RoundedButton
                        label='Cancelar'
                        width='140px'
                        buttonKind={ButtonKind.CancelButton}
                        onClick={cancel} />
                </div>
                <div className={styles.btn_save}>
                    <RoundedButton
                        label='Salvar'
                        width='140px'
                        buttonKind={ButtonKind.ConfirmButton}
                        onClick={save} />
                </div>
            </div>
        )
    }

    function renderHeader(): JSX.Element {
        return (
            <div className={styles.header}>
                <label className={styles.header_text} >Cadastrar Usuário</label>
                <div className={styles.container_img}>
                    <img src='QuestsApp-logo.svg' className={styles.img}></img>
                </div>
            </div>
        )
    }

    function renderForm(): JSX.Element {
        return (
            <div className={styles.formulario}>
                <InputForm label='Nome' />
                <InputForm label='E-mail' />
                <InputForm label='Instituição de Ensino' />

                <div className={styles.input_password}>
                    <InputForm label='Senha' type='password' width='70%' />
                    <InputForm label='Confirmar senha' type='password' width='70%' />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <CardContainer >
                <div className={styles.card_container}>
                    {renderHeader()}
                    <div className={styles.content}>
                        {renderForm()}
                        {renderButtons()}
                    </div>
                </div>
            </CardContainer>
        </div>
    )
}