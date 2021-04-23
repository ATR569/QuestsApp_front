import React, { Component } from 'react'

import styles from './SearchFilter.module.css'

export default function SearchFilter() {
    return (
        <div className={styles.filter}>
            <div className={styles.container_icon}>
                <img className={styles.icon} src="icons/lupa.svg" />
            </div>
            <input className={styles.ipt} type="text" placeholder="Filtrar" />
        </div>
    )
}