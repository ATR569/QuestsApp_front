import React, { useState, useContext } from 'react'
import styles from './Sidebar.module.css'

import templateData from '../../../template.json'

function Sidebar() {
    return (
        <nav className={styles.nav_menu}>
            <div className={styles.nav_menu_img}>
                <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
            </div>
            <ul className={styles.nav_menu_items}>
                {Object.values(templateData).map((item) => {
                    return (
                        <a href={item.path} className={styles.nav_text} key={item.id}>
                            <li key={item.id} >
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
