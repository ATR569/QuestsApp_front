import React from 'react'
import styles from './CadastroQuestionario.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { Modal } from 'antd'
import { Form, withFormik, FormikErrors } from 'formik'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'

const URI = 'questionnaires'

interface ICadastroQuestionarioProps {
    visible: boolean
    setVisible: (value: boolean) => void
    groupId: string
}

interface ICadastroQuestionarioValues {
    discipline: string
}

interface IFormProps {
    discipline?: string
}

const CadastroQuestionario: React.FC<ICadastroQuestionarioProps> = ({ visible, setVisible, groupId }) => {

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
                        label="Disciplina do questionário"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.discipline}
                        name={'discipline'} />
                    {errors.discipline && touched.discipline && <div className={styles.feedback}>{errors.discipline}</div>}
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

    const CadastroQuestionarioForm = withFormik<IFormProps, ICadastroQuestionarioValues>({
        mapPropsToValues: () => ({ discipline: '', groupId: groupId }),
        handleSubmit: async (values) => {

            await api.post(URI, values)
                .then((res: any) => {
                    openSuccessNotification('Salvo com sucesso!')
                    setVisible(false)
                    window.location.reload()
                })
                .catch((err: any) => {
                    openErrorNotification(err.response.data)
                })
        },
        validate: (values: ICadastroQuestionarioValues) => {
            let errors: FormikErrors<ICadastroQuestionarioValues> = {}

            if (!values.discipline) {
                errors.discipline = 'A disciplina é obrigatória!'
            }

            return errors;
        }
    })(renderInnerForm)

    return (
        <Modal
            className={styles.modal}
            title={<div className={styles.title}> Novo Questionário </div>}
            closable={false}
            centered
            visible={visible}
            footer="">

            <div className={styles.content}>
                <CadastroQuestionarioForm />
            </div>

        </Modal>
    )
}

export default CadastroQuestionario
