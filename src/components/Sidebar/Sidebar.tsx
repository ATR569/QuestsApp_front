import React, { useState, useContext } from 'react'
import styles from './Sidebar.module.css'
import { TemplateContext, Template } from '../../contexts/TemplateContext'

import templateData from '../../../template.json'

function Sidebar() {
    const { setTitle, setPath, setSubTitle, setIconSrc } = useContext(TemplateContext)

    function updateContext(template: Template): void {
        setTitle(template.title)
        setPath(template.path)
        setSubTitle(template.subTitle)
        setIconSrc(template.iconSrc)
    }

    return (
        <nav className={styles.nav_menu}>
            <div className={styles.nav_menu_img}>
                <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
            </div>
            <ul className={styles.nav_menu_items}>
                {Object.values(templateData).map((item, index) => {
                    return (
                        <a href={item.path} className={styles.nav_text} onClick={e => updateContext(item)}>
                            <li key={index} >
                                <img src={item.iconSrc} alt="icone" />
                                {item.title}
                            </li>
                        </a>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Sidebar
