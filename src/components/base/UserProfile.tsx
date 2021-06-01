import React, { useContext, useEffect } from 'react'
import { AuthService } from '../../services/auth'
import styles from './UserProfile.module.css'
import { User } from '../../domain/model/user'
import { UserContext } from '../../contexts/UserContext'
function UserProfile() {
    const { user, setUser } = useContext(UserContext)

    /**
     * User profile is responsible to set the user context
     */
    useEffect(() => {
        const decoded = AuthService.decodeToken()

        if (decoded !== undefined) {
            const userContext = new User().fromJSON(decoded.user)
            setUser(userContext)
        }
    }, [])

    return (
        <div className={styles.container}>
            <img src="/icons/profile-user-orange.svg" alt="Icone Profile" />
            <div className={styles.text}>
                <div className={styles.userName}> {user.name} </div>
                <div className={styles.userInstitution}>{user.institution}</div>
            </div>
        </div>
    )
}

export default UserProfile
