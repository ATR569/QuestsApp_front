import React, { Component, useContext } from 'react'
import styles from './Header.module.css'
import {TemplateContext, Template} from '../../contexts/TemplateContext'

export default function Header (){
    const {title, subTitle, iconSrc} = useContext(TemplateContext)
 
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