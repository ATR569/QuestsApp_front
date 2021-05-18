import React, { useContext } from 'react'
import styles from './Login.module.css'
import RoundedButton from '../base/RoundedButton'
import InputForm from '../base/InputForm'
import { SignContext } from '../../contexts/SignContext'
import { AuthService } from '../../services/auth'
import { useRouter } from 'next/router'
import { Form, useFormik, FormikErrors, withFormik } from 'formik'
import { api } from '../../services/api'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'

const URI = 'auth'

interface ILoginValues {
    email: string
    password: string
}

interface IFormProps {
    email?: string
    password?: string
}

const Login: React.FC = () => {
    const { toggleMode } = useContext(SignContext)
    const router = useRouter()

    const changeToCreateMode = (evt: any): void => {
        evt.preventDefault()
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
                <div className={styles.logo}>
                    <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
                </div>
                <div className={styles.form}>
                    <InputForm
                        label="E-mail"
                        type="text"
                        width="220px"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name={'email'} />

                    <InputForm
                        label="Senha"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        name={'password'} />
                </div>
                <div className={styles.footer}>
                    <img src="/login-background.svg" alt="" />
                    <a href="#" onClick={changeToCreateMode}>Ainda não sou cadastrado...</a>
                    <div className={styles.button}>
                        <RoundedButton
                            label="Entrar"
                            color="var(--light-yellow)"
                            width="170px"
                            submit />
                    </div>
                </div>
            </Form>
        )
    }

    const LoginForm = withFormik<IFormProps, ILoginValues>({
        mapPropsToValues: () => ({ email: '', password: '' }),
        handleSubmit: async (values: ILoginValues) => {
            await api.post(URI, values)
                .then((res: any) => {
                    const token = res.data.token
                    AuthService.storeToken(token)

                    router.reload()
                    openSuccessNotification('Bem Vindo ao QuestsApp!!!')
                })
                .catch((err: any) => {
                    openErrorNotification(err.response ? err.response.data : err)
                })
        },
        validate: (values: ILoginValues) => {
            let errors: FormikErrors<ILoginValues> = {}

            // if (!values.name) {
            //     errors.name = 'Required'
            // }

            return errors;
        }
    })(renderInnerForm)

    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    )
}

export default Login
