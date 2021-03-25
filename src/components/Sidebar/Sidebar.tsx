import React, { useState } from 'react'
import { SidebarData } from './SidebarData'
import styles from './Sidebar.module.css'

function Sidebar() {
    return (
        <>
            <nav className={styles.nav_menu}>
                <div className={styles.nav_menu_img}>
                    <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
                </div>
                <ul className={styles.nav_menu_items}>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={styles.nav_text}>
                                <a href="#">
                                    {item.icon}
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Sidebar
