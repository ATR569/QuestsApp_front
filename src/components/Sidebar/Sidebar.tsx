import React, { useState } from 'react'
import styles from './Sidebar.module.css'

export default class SideBar extends React.Component{
    private sidebarData = [
        {
            title: 'Início',
            path: '/home',
            icon: <img src="/icons/botao-home.svg" alt="Início" />,
        },
        {
            title: 'Meus Grupos de Estudos',
            path: '/grupos_estudos',
            icon: <img src="/icons/group.svg" alt="Meus grupos de estudos" />,
        },
        {
            title: 'Meus Questionários',
            path: '/questionarios',
            icon: <img src="/icons/questionario.svg" alt="Questionarios" />,
        },
        {
            title: 'Dados Cadastrais',
            path: '/dados-cadastrais',
            icon: <img src="/icons/users.svg" alt="Meus grupos de estudos" />,
        },
        {
            title: 'Ajuda',
            path: '/ajuda',
            icon: <img src="/icons/help.svg" alt="Meus grupos de estudos" />,
        },
    ]
    
    render() {
        return (
            <nav className={styles.nav_menu}>
                <div className={styles.nav_menu_img}>
                    <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
                </div>
                <ul className={styles.nav_menu_items}>
                    {this.sidebarData.map((item, index) => {
                        return (
                            <a href="#" className={styles.nav_text}>
                                <li key={index} >
                                    {item.icon}
                                    {item.title}
                                </li>
                            </a>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

// function Sidebar() {
//     return (
//         <nav className={styles.nav_menu}>
//             <div className={styles.nav_menu_img}>
//                 <img src="/QuestsApp-logo.svg" alt="Logo QuestsApp" />
//             </div>
//             <ul className={styles.nav_menu_items}>
//                 {sidebarData.map((item, index) => {
//                     return (
//                         <a href="#" className={styles.nav_text}>
//                             <li key={index} >
//                                 {item.icon}
//                                 {item.title}
//                             </li>
//                         </a>
//                     )
//                 })}
//             </ul>
//         </nav>
//     )
// }

// export default Sidebar
