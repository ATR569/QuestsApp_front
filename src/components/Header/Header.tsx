import React, { useContext } from 'react'
import styles from './Header.module.css'
import {TemplateContext} from '../../contexts/TemplateContext'
import templateData from '../../../template.json'

export default function Header (){
    const { page } = useContext(TemplateContext)

    const title = templateData[page].title
    const subTitle = templateData[page].subTitle
    const iconSrc = templateData[page].iconSrc
 
    function renderIcon(): any {
        return (
            <div className={styles.icon}>
                <img src={iconSrc} alt="img"/>
            </div>
        )
    }
    
    function renderPageTitle(title: string): any {
        return (
            <div className={styles.pageTitle}>
                {renderIcon()}
                {title}
            </div>
        )
    }

    function renderSubtitle(subTitle: string): any {
        return (
            <div className={styles.subtitle}>
                {subTitle}
            </div>
        )
    }

    function renderUserProfile(): any {
        return (
            <div className={styles.userProfile}>

            </div>
        )
    }

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                {renderPageTitle(title)}
                {renderUserProfile()}
            </div>
                {renderSubtitle(subTitle)}
        </div>
    )
}