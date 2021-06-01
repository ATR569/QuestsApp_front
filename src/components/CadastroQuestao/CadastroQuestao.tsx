import React from 'react'
import styles from './CadastroQuestao.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { Modal } from 'antd'
import { Form, withFormik, FormikErrors } from 'formik'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { useRouter } from 'next/router'
import { AuthService } from '../../services/auth'

const URI = 'questions'

interface ICadastroQuestaoProps {
    visible: boolean
    setVisible: (value: boolean) => void
    creatorId: string
    questionnaireId: string
}

interface ICadastroQuestaoValues {
    description: string
}

interface IFormProps {
    description?: string
}

const CadastroQuestao: React.FC<ICadastroQuestaoProps> = ({ visible, setVisible, questionnaireId, creatorId }) => {
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
                        label="Descrição da questão"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        name={'description'} />
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

    const CadastroQuestaoForm = withFormik<IFormProps, ICadastroQuestaoValues>({
        mapPropsToValues: () => ({ description: '', creator: { id: creatorId }, questionnaireId: questionnaireId }),
        handleSubmit: async (values) => {
            const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

            await api.post(URI, values, headers)
                .then((res: any) => {
                    openSuccessNotification('Salvo com sucesso!')
                    setVisible(false)
                    setTimeout(() =>  router.reload() , 1000)
                })
                .catch((err: any) => {
                    openErrorNotification(err)
                    if (err.response && err.response.status === 401) {
                        AuthService.removeToken()
                        setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                    }
                })
        },
        validate: (values: ICadastroQuestaoValues) => {
            let errors: FormikErrors<ICadastroQuestaoValues> = {}

            if (!values.description) {
                errors.description = 'A descrição da questão é obrigatória!'
            }

            return errors;
        }
    })(renderInnerForm)

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Nova Questão </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <CadastroQuestaoForm />
            </div>

        </Modal>
    )
}

export default CadastroQuestao
