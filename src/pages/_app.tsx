import React, { useState, useEffect } from 'react'
import SideBar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import Sign from '../components/Sign/Sign'
import { TemplateProvider } from '../contexts/TemplateContext'
import { SignProvider, Mode } from '../contexts/SignContext'
import '../styles/global.css'
import styles from '../styles/pages/app.module.css'
import  {AuthService}  from '../services/auth'

function MyApp({ Component, pageProps }) {
    const [isAuthenticated, setAuthenticated] = useState(false as Boolean)

    useEffect(() => {
        setAuthenticated(AuthService.isAuthenticated())
    }, [isAuthenticated])

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
        <div className={styles.app}>
            { isAuthenticated ? renderAppTemplate() : renderSign()}
            {/* { renderSign() } */}
        </div>
    )
}

export default MyApp