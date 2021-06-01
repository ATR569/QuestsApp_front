import React, { useState, useContext } from 'react'
import styles from './Sidebar.module.css'
import templateData from '../../../template.json'
import { useRouter } from 'next/router'

function Sidebar() {

    const router = useRouter()

    return (
        <nav className={styles.nav_menu}>
            <div className={styles.nav_menu_img}>
                <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
            </div>
            <ul className={styles.nav_menu_items}>
                {Object.values(templateData)
                    .filter(item => item.showInSideBar)
                    .map((item) => {
                        return (
                            <div key={item.id} className={router.asPath === item.path ? styles.selected : styles.not_selected}>
                                <a href={item.path} key={item.id} className={styles.nav_text} >
                                    <li key={item.id}>
                                        <img src={item.iconSrc} alt="icone" />
                                        {item.title}
                                    </li>
                                </a>
                            </div>
                        )
                    })}
            </ul>
        </nav>
    )
}

export default Sidebar
