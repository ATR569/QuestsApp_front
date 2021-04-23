import React, { useState } from 'react'
import styles from './CadastroGrupo.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { Modal } from 'antd'

export default function CadastroGrupo(props) {

    function handdleCancelar(event: Event) {
        event.preventDefault()
        props.setVisible(false)
    }

    function handdleSalvar(event: Event) {
        event.preventDefault()
        props.setVisible(false)
    }

    return (
        <Modal 
            className={styles.modal}
            title={
                <div className={styles.title}>
                    Novo Grupo de Estudos
                </div>
            }
            closable={false}
            centered
            visible={props.visible}
            footer={
                <div className={styles.buttons}>
                    <RoundedButton 
                        label="Cancelar" 
                        buttonKind={ButtonKind.CancelButton} 
                        width="120px" 
                        onClick={handdleCancelar}/>

                    <RoundedButton 
                        label="Salvar" 
                        buttonKind={ButtonKind.ConfirmButton} 
                        width="120px"
                        onClick={handdleSalvar}/>
                </div>
            }
        >
            <div className={styles.content}>
                <div className={styles.form}>
                    <InputForm label="Nome do grupo de Estudo"/>
                </div>
            </div>
        </Modal>
    )
}

// interface IPropsCadastroGrupo {
//     visible: boolean
// }

// export class CadastroGrupo extends React.Component<IPropsCadastroGrupo, {}> {
//     state = {

//     }
//     private handdleCancelar(event: Event) {
//         event.preventDefault()
//         setVisible(false)
//     }

//     private handdleSalvar(event: Event) {
//         event.preventDefault()
//         setVisible(false)
//     }

//     public render(): any {
//         return (
//             <Modal
//                 className={styles.modal}
//                 title={
//                     <div className={styles.title}>
//                         Novo Grupo de Estudos
//                 </div>
//                 }
//                 closable={false}
//                 centered
//                 visible={this.props.visible}
//                 footer={
//                     <div className={styles.buttons}>
//                         <RoundedButton
//                             label="Cancelar"
//                             buttonKind={ButtonKind.CancelButton}
//                             width="120px"
//                             onClick={this.handdleCancelar} />

//                         <RoundedButton
//                             label="Salvar"
//                             buttonKind={ButtonKind.ConfirmButton}
//                             width="120px"
//                             onClick={this.handdleSalvar} />
//                     </div>
//                 }
//             >
//                 <div className={styles.content}>
//                     <div className={styles.form}>
//                         <InputForm label="Nome do grupo de Estudo" />
//                     </div>
//                 </div>
//             </Modal>
//         )
//     }
// }