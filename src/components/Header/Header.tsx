import React, { useContext } from 'react'
import styles from './Header.module.css'
import { TemplateContext } from '../../contexts/TemplateContext'
import templateData from '../../../template.json'
import UserProfile from '../base/UserProfile'
import { useRouter } from 'next/router'
import { AuthService } from '../../services/auth'

const Header: React.FC<{}> = ({ }) => {
    const { page } = useContext(TemplateContext)
    const router = useRouter()

    const title = templateData[page].title
    const subTitle = templateData[page].subTitle
    const iconSrc = templateData[page].iconSrc

    const handleLogoutClick = () => {
        AuthService.removeToken()
        router.push('/').then(() => router.reload())
    }

    const handleInvitesClick = () => {
        router.push('/convites')
    }

    const renderIcon = (): any => {
        return (
            <div className={styles.icon}>
                <img src={iconSrc} alt="img" />
            </div>
        )
    }

    const renderPageTitle = (title: string): any => {
        return (
            <div className={styles.pageTitle}>
                {renderIcon()}
                {title}
            </div>
        )
    }

    const renderSubtitle = (subTitle: string): any => {
        return (
            <div className={styles.subtitle}>
                {subTitle}
            </div>
        )
    }

    const renderUserProfile = (): any => {
        return (
            <div className={styles.userProfile}>
                <UserProfile />
            </div>
        )
    }

    const renderToolBar = (): any => {
        return (
            <div className={styles.toolbar}>
                <button type="button" className={styles.button} onClick={handleInvitesClick}>
                    <img src="/icons/envelope.svg" alt="Convites" />
                </button>
                <button type="button" className={styles.button} onClick={handleLogoutClick}>
                    <img src="/icons/logout.svg" alt="Realizar logout" />
                </button>
            </div>
        )
    }

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                {renderPageTitle(title)}
                {renderUserProfile()}
            </div>
            <div className={styles.subtitleBar}>
                {renderSubtitle(subTitle)}
                {renderToolBar()}
            </div>
        </div>
    )
}

export default Header
