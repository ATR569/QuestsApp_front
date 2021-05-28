import React from 'react'
import styles from './DeletarQuestao.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import { Modal } from 'antd'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { Question } from '../../domain/model/question'

const URI = 'questions'

interface IDeletarQuestaoProps {
    visible: boolean
    setVisible: (value: boolean) => void
    question: Question
}

const DeletarQuestao: React.FC<IDeletarQuestaoProps> = ({ visible, setVisible, question }) => {

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const handleExcluir = async (event: Event) => {
        event.preventDefault()
        setVisible(true)

        await api.delete(URI.concat(`/${question.id}`))
            .then((res: any) => {
                openSuccessNotification('Deletado com sucesso!')
                setVisible(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
            })
    }

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Deletar Questão </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <div className={styles.form}>
                    <h3 style={{ display: 'flex', justifyContent: 'center', padding: '10px', color: 'var(--orange)', fontWeight: 'bold' }}>
                        {question.description}
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

export default DeletarQuestao
