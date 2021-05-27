import React, { Component, useEffect, useState } from 'react'
import { Group } from '../../domain/model/group'
import { AuthService } from '../../services/auth'
import DeletarGrupo from '../DeletarGrupo/DeletarGrupo'
import styles from './CardGroup.module.css'

interface IGroupProps {
    group: Group
}

const CardGroup: React.FC<IGroupProps> = ({ group }) => {

    const [visible, setVisible] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState('')

    useEffect(() => {
        const user = AuthService.decodeToken().user
        setLoggedUserId(user.id)
    }, [])

    const handleDelete = (event: any) => {
        event.preventDefault()
        setVisible(true)
    }

    function checkAdmin(groupAdministratorId: string): boolean {
        return groupAdministratorId === loggedUserId
    }

    return (
        <div className={styles.card_group}>
            <DeletarGrupo visible={visible} setVisible={setVisible} group={group} />

            <div className={styles.del_group} >
                <button
                    className={styles.buttons}
                    onClick={e => handleDelete(e)}
                    style={checkAdmin(group.administrator.id) ? {} : { visibility: 'hidden' }} >
                    <img src='icons/fechar.svg' className={styles.img_trash}></img>
                </button>
            </div>

            <div className={styles.container_img}>
                <img src='icons/group.svg' className={styles.img}></img>
            </div>

            <div className={styles.title_group}>
                {group.name}
            </div>

            <div className={styles.informations}>
                <span>{`${group.membersCount} Membros`}</span>
                <span>{`${group.questionnairesCount} Questionários`}</span>
            </div>

            <div className={styles.effect} />

        </div>
    )
}

export default CardGroup

// export default class CardGroup extends Component<IGroupProps, {}> {

//     render(): any {

//         const group: Group = this.props.group

//         return (
//             <div className={styles.card_group}>

//                 <div className={styles.del_group} >
//                     <button className={styles.buttons}>
//                         <img src='icons/fechar.svg' className={styles.img_trash}></img>
//                     </button>
//                 </div>

//                 <div className={styles.container_img}>
//                     <img src='icons/group.svg' className={styles.img}></img>
//                 </div>

//                 <div className={styles.title_group}>
//                     {group.name}
//                 </div>

//                 <div className={styles.informations}>
//                     <span>{`${group.membersCount} Membros`}</span>
//                     <span>{`${group.questionnairesCount} Questionários`}</span>
//                 </div>

//                 <div className={styles.effect} />
//             </div>
//         )
//     }
// }