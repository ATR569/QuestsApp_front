import React, { useState, useEffect, useContext } from 'react'
import SideBar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import Sign from '../components/Sign/Sign'
import { TemplateProvider } from '../contexts/TemplateContext'
import { SignProvider, Mode } from '../contexts/SignContext'
import { UserContext, UserProvider } from '../contexts/UserContext'
import '../styles/global.css'
import styles from '../styles/pages/app.module.css'
import { AuthService } from '../services/auth'
import { useRouter } from 'next/router'
import { User } from '../domain/model/user'

let auth: Boolean = true

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [isAuthenticated, setAuthenticated] = useState(auth)

    useEffect(() => {
        setAuthenticated(AuthService.isAuthenticated())
    }, [])

    function renderAppTemplate() {
        return (
            <TemplateProvider page="inicio">
                <div className={styles.appTemplate}>
                    <SideBar />
                    <Header />
                    <div className={styles.content}>
                        <Component {...pageProps} />
                    </div>
                </div>
            </TemplateProvider>
        )
    }

    function renderSign() {
        return (
            <SignProvider mode={Mode.LOGIN}>
                <div className={styles.appTemplate}>
                    <Sign />
                </div>
            </SignProvider>
        )
    }

    return (
        <UserProvider user={new User()}>{
            isAuthenticated ? (
                <div className={styles.app}>
                    { renderAppTemplate()}
                </div>
            ) : (
                <div className={styles.app}>
                    { renderSign()}
                </div>
            )
        }</UserProvider>
    )
}

export default MyApp