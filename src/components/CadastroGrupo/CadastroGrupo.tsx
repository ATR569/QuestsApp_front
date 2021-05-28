import React, { useEffect, useState } from 'react'
import styles from './CadastroGrupo.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { Modal } from 'antd'
import { Form, withFormik, FormikErrors } from 'formik'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { AuthService } from '../../services/auth'

const URI = 'groups'

interface ICadastroGrupoProps {
    visible: boolean
    setVisible: (value: boolean) => void
}

interface ICadastroGrupoValues {
    name: string
}

interface IFormProps {
    name?: string
}

const CadastroGrupo: React.FC<ICadastroGrupoProps> = ({ visible, setVisible }) => {
    const [loggedUserId, setLoggedUserId] = useState('')

    useEffect(() => {
        const user = AuthService.decodeToken().user
        setLoggedUserId(user.id)
    }, [])

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const renderInnerForm = (props) => {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
        } = props

        return (
            <div className={styles.form}>
                <Form>
                    <InputForm
                        label="Nome do grupo de Estudo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name={'name'} />
                    {errors.name && touched.name && <div className={styles.feedback}>{errors.name}</div>}
                    <div className={styles.buttons}>
                        <RoundedButton
                            label="Cancelar"
                            buttonKind={ButtonKind.CancelButton}
                            width="120px"
                            onClick={handleCancelar} />

                        <RoundedButton
                            label="Salvar"
                            buttonKind={ButtonKind.ConfirmButton}
                            width="120px"
                            submit />
                    </div>
                </Form>
            </div >
        )
    }

    const CadastroUsuarioForm = withFormik<IFormProps, ICadastroGrupoValues>({
        mapPropsToValues: () => ({ name: '' }),
        handleSubmit: async (values) => {
            await api.post(URI, { name: values.name, administrator: { id: loggedUserId } })
                .then((res: any) => {
                    openSuccessNotification('Salvo com sucesso!')
                    setVisible(false)
                    setTimeout(() => { window.location.reload() }, 1000)
                })
                .catch((err: any) => {
                    openErrorNotification(err)
                })
        },
        validate: (values: ICadastroGrupoValues) => {
            let errors: FormikErrors<ICadastroGrupoValues> = {}

            if (!values.name) {
                errors.name = 'O nome do grupo é obrigatório!'
            }

            return errors;
        }
    })(renderInnerForm)

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Novo Grupo de Estudos </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <CadastroUsuarioForm />
            </div>

        </Modal>
    )
}

export default CadastroGrupo