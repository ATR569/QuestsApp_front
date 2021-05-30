import { Modal } from 'antd'
import { Form, FormikErrors, withFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '../../services/api'
import { AuthService } from '../../services/auth'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import styles from './EditarComentario.module.css'

const URI = 'answers'

interface IEditAnswerProps {
    visible: boolean
    setVisible: (value: boolean) => void
    oldDescription: string
    answerId: string
}

interface IEditAnswerValues {
    description: string
}

interface IFormProps {
    description?: string
}

const EditAnswer: React.FC<IEditAnswerProps> = ({ visible, setVisible, answerId, oldDescription }) => {
    const router = useRouter()

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        setVisible(false)
    }

    const renderInnerForm = (props) => {
        const {
            touched,
            errors,
            handleChange,
            handleBlur,
        } = props

        return (
            <div className={styles.form}>
                <Form>
                    <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name={'description'}
                        className={styles.editComment}
                    >
                        {oldDescription}
                    </textarea>
                    {errors.description && touched.description && <div className={styles.feedback}>{errors.description}</div>}
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

    const EditAnswerForm = withFormik<IFormProps, IEditAnswerValues>({
        mapPropsToValues: () => ({ description: '', answerId: answerId }),
        handleSubmit: async (values) => {
            const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

            await api.patch(URI.concat(`/${answerId}`), values, headers)
                .then((res: any) => {
                    openSuccessNotification('Salvo com sucesso!')
                    setVisible(false)
                    setTimeout(() => router.reload(), 1000)
                })
                .catch((err: any) => {
                    openErrorNotification(err)
                    if (err.response && err.response.status === 401) {
                        AuthService.removeToken()
                        setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                    }
                })
        },
        validate: (values: IEditAnswerValues) => {
            let errors: FormikErrors<IEditAnswerValues> = {}

            if (!values.description) {
                errors.description = 'O comentário é obrigatória!'
            }

            return errors;
        }
    })(renderInnerForm)

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Editar Comentário </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <EditAnswerForm />
            </div>

        </Modal>
    )
}

export default EditAnswer
