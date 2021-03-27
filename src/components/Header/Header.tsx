import React, { Component } from 'react'
import styles from './Header.module.css'

type myProps = {
    imageSrc: string
    title: string
    subtitle: string
}

export default class Header extends Component <myProps, myProps> {
    constructor (props) {
        super(props)
        this.state = { ...props }
    }

    private renderIcon(): any {
        return (
            <div className={styles.icon}>
                <img src={this.state.imageSrc} alt="img"/>
            </div>
        )
    }
    
    private renderPageTitle(title: string): any {
        return (
            <div className={styles.pageTitle}>
                {this.renderIcon()}
                {title}
            </div>
        )
    }

    private renderSubtitle(subTitle: string): any {
        return (
            <div className={styles.subtitle}>
                {subTitle}
            </div>
        )
    }

    private renderUserProfile(): any {
        return (
            <div className={styles.userProfile}>

            </div>
        )
    }

    render () {
        return (
            <div className={styles.header}>
                <div className={styles.content}>
                    {this.renderPageTitle('Título da Página')}
                    {this.renderUserProfile()}
                </div>
                    {this.renderSubtitle('Subtítulo da página')}
            </div>
        )
    }
}