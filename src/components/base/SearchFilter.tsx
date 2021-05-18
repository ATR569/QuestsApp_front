import React, { Component, useState } from 'react'

import styles from './SearchFilter.module.css'

interface IFilterProps {
    onChange?: (e) => void
}

const SearchFilter: React.FC<IFilterProps> = ({ onChange }) => {
    return (
        <div className={styles.filter}>
            <div className={styles.container_icon}>
                <img className={styles.icon} src="icons/lupa.svg" />
            </div>
            <input onChange={onChange} className={styles.ipt} type="text" placeholder="Filtrar" />
        </div>
    )
}

export default SearchFilter