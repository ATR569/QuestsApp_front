import React, { useContext } from 'react'
import styles from './UserProfile.module.css'
// import { TemplateContext } from '../../contexts/TemplateContext'

function UserProfile() {
    // const { name, institution } = useContext(TemplateContext)

    return (
        <div className={styles.container}>
            <img src="/icons/profile-user-orange.svg" alt="Icone Profile" />
            <div className={styles.text}>
                {/* <h3>{name}</h3>
                <h6>{institution}</h6> */}
                <h3>Fulano de Tal</h3>
                <h6>UEPB</h6>
            </div>
        </div>
    )
}
export default UserProfile
