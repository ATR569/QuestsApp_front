import React from 'react'
import styles from './DeletarQuestao.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import { Modal } from 'antd'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { Question } from '../../domain/model/question'
import { useRouter } from 'next/router'
import { AuthService } from '../../services/auth'

const URI = 'questions'

interface IDeletarQuestaoProps {
    visible: boolean
    setVisible: (value: boolean) => void
    question: Question
}

const DeletarQuestao: React.FC<IDeletarQuestaoProps> = ({ visible, setVisible, question }) => {
    const router = useRouter()

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const handleExcluir = async (event: Event) => {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }
        event.preventDefault()
        setVisible(true)

        await api.delete(URI.concat(`/${question.id}`), headers)
            .then((res: any) => {
                openSuccessNotification('Deletado com sucesso!')
                setVisible(false)
                setTimeout(() => {
                    router.reload()
                }, 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() =>  router.push('/').then(() => router.reload()) , 1000)
                }
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
