import React, { useContext } from 'react'
import CardContainer from '../base/CardContainer'
import InputForm from '../base/InputForm'
import RoundedButton, { ButtonKind } from '../base/RoundedButton'
import styles from './CadastroUsuario.module.css'
import { SignContext } from '../../contexts/SignContext'
import { Form, withFormik, FormikErrors } from 'formik'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import { api } from '../../services/api'

const URI = 'users'

interface ICadastroUsuarioValues {
    name: string
    email: string
    password: string
    confirmPassword: string
    institution: string
}

interface ICadastroUsuarioProps {
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    institution?: string
}

const CadastroUsuario: React.FC<ICadastroUsuarioProps> = ({ }) => {
    const { toggleMode } = useContext(SignContext)

    const handleCancelar = (event: Event) => {
        event.preventDefault()
        toggleMode()
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
            <Form>
                <div className={styles.container}>
                    <CardContainer>
                        <div className={styles.card_container}>
                            <div className={styles.header}>
                                <label className={styles.header_text} >Cadastrar Usuário</label>
                                <div className={styles.container_img}>
                                    <img src='QuestsApp-logo.svg' className={styles.img}></img>
                                </div>
                            </div>


                            <div className={styles.content}>
                                <div className={styles.formulario}>
                                    <InputForm
                                        label='Nome'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        name={'name'} />
                                    {errors.name && touched.name && <div className={styles.feedback}>{errors.name}</div>}

                                    <InputForm
                                        label='E-mail'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        name={'email'} />
                                    {errors.email && touched.email && <div className={styles.feedback}>{errors.email}</div>}

                                    <InputForm
                                        label='Instituição de Ensino'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.institution}
                                        name={'institution'} />
                                    {errors.institution && touched.institution && <div className={styles.feedback}>{errors.institution}</div>}

                                    <div className={styles.input_password}>
                                        <InputForm
                                            label='Senha'
                                            type='password'
                                            width='70%'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            name={'password'} />
                                        {errors.password && touched.password && <div className={styles.feedback}>{errors.password}</div>}

                                        <InputForm
                                            label='Confirmar senha'
                                            type='password'
                                            width='70%'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                            name={'confirmPassword'} />
                                        {errors.confirmPassword && touched.confirmPassword && <div className={styles.feedback}>{errors.confirmPassword}</div>}

                                    </div>
                                </div>

                                <div className={styles.buttons}>
                                    <div className={styles.bt_cancel}>
                                        <RoundedButton
                                            label='Cancelar'
                                            width='140px'
                                            buttonKind={ButtonKind.CancelButton}
                                            onClick={handleCancelar} />
                                    </div>
                                    <div className={styles.btn_save}>
                                        <RoundedButton
                                            label='Salvar'
                                            width='140px'
                                            buttonKind={ButtonKind.ConfirmButton}
                                            submit />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </CardContainer>
                </div>
            </Form>
        )
    }

    const CadastroUsuarioForm = withFormik<ICadastroUsuarioProps, ICadastroUsuarioValues>({
        mapPropsToValues: () => ({ name: '', email: '', password: '', confirmPassword: '', institution: '' }),
        handleSubmit: async (values) => {

            await api.post(URI, values)
                .then((res: any) => {
                    openSuccessNotification('Salvo com sucesso!')
                    toggleMode()
                })
                .catch((err: any) => {
                    openErrorNotification(err)
                })
        },
        validate: (values: ICadastroUsuarioValues) => {
            let errors: FormikErrors<ICadastroUsuarioValues> = {}

            if (!values.name) {
                errors.name = 'O nome é obrigatório!'
            }

            if (!values.institution) {
                errors.institution = 'A instituição é obrigatória!'
            }

            if (!values.password) {
                errors.password = 'A senha é obrigatória!'
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'A confirmação de senha é obrigatória!'
            }

            if (values.password != values.confirmPassword) {
                errors.confirmPassword = 'As senhas não combinam'
            }

            if (!values.email) {
                errors.email = 'O email é obrigatório!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Email inválido!';
            }

            return errors;
        }
    })(renderInnerForm)

    return (
        <div>
            <CadastroUsuarioForm />
        </div>
    )
}

export default CadastroUsuario