import React from 'react'
import styles from './DeletarMembro.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import { Modal } from 'antd'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { Group } from '../../domain/model/group'
import { User } from '../../domain/model/user'

const URI = 'groups'

interface IDeletarMembroProps {
    visible: boolean
    setVisible: (value: boolean) => void
    group: Group
    member: User
}

const DeletarMembro: React.FC<IDeletarMembroProps> = ({ visible, setVisible, group, member }) => {

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const handleExcluir = async (event: Event) => {
        event.preventDefault()
        setVisible(true)

        await api.delete(URI.concat(`/${group.id}/members/${member.id}`))
            .then((res: any) => {
                openSuccessNotification('Deletado com sucesso!')
                setVisible(false)
                setTimeout(() => window.location.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
            })
    }

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Deletar Membro do Grupo </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <div className={styles.form}>
                    <h3 style={{ display: 'flex', justifyContent: 'center', padding: '10px', color: 'var(--orange)', fontWeight: 'bold' }}>
                        {member.name}
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

export default DeletarMembro
