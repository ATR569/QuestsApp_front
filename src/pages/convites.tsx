import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { TemplateContext } from '../contexts/TemplateContext'
import { api } from '../services/api'
import { openErrorNotification, openSuccessNotification } from '../utils/notification'
import { AuthService } from '../services/auth'
import { Invite, InviteStatus } from '../domain/model/invite'
import styles from '../styles/pages/invites.module.css'
import CardContainer from '../components/base/CardContainer'
import { Messages } from '../utils/messages'
import RoundedButton, { ButtonKind } from '../components/base/RoundedButton'
import { Collapse } from 'antd'

const URI = 'invites'

export default function Invites() {
    const [invites, setInvites] = useState([])
    const [invitesMapped, setInvitesMapped] = useState([])

    const { changePage } = useContext(TemplateContext)
    const router = useRouter()

    useEffect(() => {
        changePage('convites')
        getInvites()
    }, [])

    const getInvites = (): void => {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        api.get(URI, headers)
            .then((res: any) => {
                const invites: Array<Invite> = res.data.map((json: any) => new Invite().fromJSON(json))
                setInvites(invites)
                setInvitesMapped(mapInvitesToJsx(invites))
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                }
            })
    }

    const mapInviteToListItem = (invite: Invite): JSX.Element => {
        return (
            <li id={invite.id} key={invite.id}>
                <div className={styles.listItem}>
                    <span>{invite.date}</span>
                    <div className={styles.listItemDescription}>
                        <span>
                            {Messages.INVITES.INVITE_MSG.replace('{0}', invite.group.administrator.name)
                                .replace('{1}', invite.group.name)}
                        </span>
                    </div>
                    {
                        invite.status === InviteStatus.PENDING ? (
                            <div className={styles.listItemButtons}>
                                <RoundedButton
                                    label="Aceitar"
                                    buttonKind={ButtonKind.ConfirmButton}
                                    onClick={() => handleAcceptInvite(invite.id)} />
                                <RoundedButton 
                                    label="Recusar" 
                                    buttonKind={ButtonKind.CancelButton} 
                                    onClick={() => handleDenyInvite(invite.id)} />
                            </div>

                        ) : (
                            <div className={styles.listItemStatus}>
                                {invite.status === InviteStatus.ACCEPTED ?
                                    <span className={styles.accepted}>Convite Aceito</span> :
                                    <span className={styles.denied}>Convite Recusado</span>}
                            </div>
                        )
                    }
                </div>
            </li>
        )
    }

    const mapInvitesToJsx = (invites: Array<Invite>): Array<JSX.Element> => {
        const jsx: Array<any> = invites.map(invite => mapInviteToListItem(invite))
        return jsx
    }

    const handleAcceptInvite = (inviteId: string): void => {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        api.patch(`${URI}/${inviteId}`, { status: 'accepted' }, headers)
            .then(() => {
                openSuccessNotification('Parabéns, você agora é membro do grupo!')
                setTimeout(() => router.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                }
            })
    }

    const handleDenyInvite = (inviteId: string): void => {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        api.patch(`${URI}/${inviteId}`, { status: 'denied' }, headers)
            .then(() => {
                openSuccessNotification('Você recusou o convite para entrar no grupo!')
                setTimeout(() => router.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                }
            })
    }

    return (
        <CardContainer>
            <Collapse defaultActiveKey={['0']}>
                <Collapse.Panel header="Todos os convites" key={0}>
                    <div className={styles.invites}>
                        <ul>
                            {invitesMapped}
                        </ul>
                    </div>
                </Collapse.Panel>
            </Collapse>
        </CardContainer>
    )
}
