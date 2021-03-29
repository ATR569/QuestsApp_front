import { useState } from 'react'
import SideBar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import { TemplateProvider, Template } from '../contexts/TemplateContext'
import '../styles/global.css'
import styles from '../styles/pages/app.module.css'
import templateData from '../../template.json'

function MyApp({ Component, pageProps }) {
    return (
        <TemplateProvider>
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

export default MyApp