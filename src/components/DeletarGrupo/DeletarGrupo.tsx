import React from 'react'
import styles from './DeletarGrupo.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import { Modal } from 'antd'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { Group } from '../../domain/model/group'

const URI = 'groups'

interface IDeletarGrupoProps {
    visible: boolean
    setVisible: (value: boolean) => void
    group: Group
}

const DeletarGrupo: React.FC<IDeletarGrupoProps> = ({ visible, setVisible, group }) => {

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const handleExcluir = async (event: Event) => {
        event.preventDefault()
        setVisible(true)

        await api.delete(URI.concat(`/${group.id}`))
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
            title={<div className={styles.title}> Deletar Grupo </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <div className={styles.form}>
                    <h3 style={{ display: 'flex', justifyContent: 'center', padding: '10px', color: 'var(--orange)', fontWeight: 'bold' }}>
                        {group.name}
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

export default DeletarGrupo
