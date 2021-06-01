import React from 'react'
import styles from './ConvidarMembro.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { Modal } from 'antd'
import { Form, withFormik, FormikErrors } from 'formik'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { useRouter } from 'next/router'
import { AuthService } from '../../services/auth'

const URI = 'invites'

interface IConvidarMembroProps {
    visible: boolean
    setVisible: (value: boolean) => void
    groupId: string
}

interface IConvidarMembroValues {
    email: string
}

interface IFormProps {
    email?: string
}

const ConvidarMembro: React.FC<IConvidarMembroProps> = ({ visible, setVisible, groupId }) => {
    const router = useRouter()

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
                        label="Email do convidado"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name={'email'}
                    />
                    {errors.email && touched.email && <div className={styles.feedback}>{errors.email}</div>}
                    <div className={styles.buttons}>
                        <RoundedButton
                            label="Cancelar"
                            buttonKind={ButtonKind.CancelButton}
                            width="120px"
                            onClick={handleCancelar} />

                        <RoundedButton
                            label="Enviar"
                            buttonKind={ButtonKind.ConfirmButton}
                            width="120px"
                            submit />
                    </div>
                </Form>
            </div >
        )
    }

    const ConviteMembroForm = withFormik<IFormProps, IConvidarMembroValues>({
        mapPropsToValues: () => ({ email: '', groupId: groupId }),
        handleSubmit: async (values) => {
            const body = { user: { email: values.email }, group: { id: groupId } }
            const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

            await api.post(URI, body, headers)
                .then((res: any) => {
                    setVisible(false)
                    openSuccessNotification('Convite enviado com sucesso!')
                    setTimeout(() => { router.reload() }, 1000)
                })
                .catch((err: any) => {
                    openErrorNotification(err)
                    setVisible(false)
                    if (err.response && err.response.status === 401) {
                        AuthService.removeToken()
                        setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                    }
                })
        },
        validate: (values: IConvidarMembroValues) => {
            let errors: FormikErrors<IConvidarMembroValues> = {}

            if (!values.email) {
                errors.email = 'O email é obrigatório!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Email inválido!';
            }

            return errors;
        }
    })(renderInnerForm)

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Convidar membro </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <ConviteMembroForm />
            </div>

        </Modal>
    )
}

export default ConvidarMembro