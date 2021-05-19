import React from 'react'
import styles from '../../styles/modalCadastro.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import { Modal } from 'antd'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { Questionnaire } from '../../domain/model/questionnaire'

const URI = 'questionnaires'

interface IDeletarQuestionarioProps {
    visible: boolean
    setVisible: (value: boolean) => void
    questionnaire: Questionnaire
}

const DeletarQuestionario: React.FC<IDeletarQuestionarioProps> = ({ visible, setVisible, questionnaire }) => {

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const handleExcluir = async (event: Event) => {
        event.preventDefault()
        setVisible(true)

        await api.delete(URI.concat(`/${questionnaire.id}`))
            .then((res: any) => {
                openSuccessNotification('Deletado com sucesso!')
                setVisible(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err.response.data)
            })
    }

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Deletar Questionário </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <div className={styles.form}>
                    <h3 style={{ display: 'flex', justifyContent: 'center', padding: '10px', color: 'var(--orange)', fontWeight: 'bold' }}>
                        {questionnaire.discipline}
                    </h3>
                    <div className={styles.buttons}>
                        <RoundedButton
                            label="Cancelar"
                            buttonKind={ButtonKind.CancelButton}
                            width="120px"
                            onClick={handleCancelar} />

                        <RoundedButton
                            label="Deletar"
                            buttonKind={ButtonKind.ConfirmButton}
                            width="120px"
                            onClick={handleExcluir}
                        />
                    </div>
                </div >
            </div>

        </Modal>
    )
}

export default DeletarQuestionario