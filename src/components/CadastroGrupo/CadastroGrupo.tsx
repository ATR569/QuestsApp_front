import React, { useContext } from 'react'
import styles from './CadastroGrupo.module.css'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { Modal } from 'antd'
import { Form, withFormik, FormikErrors } from 'formik'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { UserContext } from '../../contexts/UserContext'
import { AuthService } from '../../services/auth'
import { useRouter } from 'next/router'

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
    const { user } = useContext(UserContext)
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

    const CadastroGrupoForm = withFormik<IFormProps, ICadastroGrupoValues>({
        mapPropsToValues: () => ({ name: '', administrator: { id: user.id } }),
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
                        setTimeout(() =>  router.push('/').then(() => router.reload()) , 1000)
                    }
                })
        },
        validate: (values: ICadastroGrupoValues) => {
            let errors: FormikErrors<ICadastroGrupoValues> = {}

            if (!values.name) {
                errors.name = 'O nome do grupo ?? obrigat??rio!'
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
                <CadastroGrupoForm />
            </div>

        </Modal>
    )
}

export default CadastroGrupo