import React, { useContext, useEffect, useState } from 'react'
import CardGroup from '../components/base/CardGroup'
import CardContainer from '../components/base/CardContainer'
import CadastroGrupo from '../components/CadastroGrupo/CadastroGrupo'
import SearchFilter from '../components/base/SearchFilter'
import RoundedButton, { ButtonKind } from '../components/base/RoundedButton'
import styles from '../styles/pages/grupos.module.css'
import { TemplateContext } from '../contexts/TemplateContext'
import { Group } from '../domain/model/group'
import Link from 'next/link'
import { api } from '../services/api'
import { openErrorNotification } from '../utils/notification'
import { useRouter } from 'next/router'
import { AuthService } from '../services/auth'

const URI = 'groups'

export default function Grupo() {

    const { changePage } = useContext(TemplateContext)
    const [cadastroVisible, setCadastroVisible] = useState(false)
    const [groups, setGroups] = useState([])
    const [groupsMapped, setGroupsMapped] = useState([])
    const router = useRouter()

    useEffect(() => {
        changePage('grupos')
        getGroups()
    }, [])

    function getGroups() {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        api.get(URI, headers)
            .then((res: any) => {
                setGroups(res.data)
                setGroupsMapped(mapGroups(res.data))
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                }
            })
    }

    function filterGroups(e) {
        const iptValue = e.target.value.toLowerCase()
        const gruposFiltered = groups.filter(group => group.name.toLowerCase().startsWith(iptValue))
        setGroupsMapped(mapGroups(gruposFiltered))
    }

    function mapGroups(groupsF: Array<Group>) {
        return groupsF.map((group, index) => {
            return (
                <Link href={`/grupos_detalhes/${group.id}`} key={index}>
                    <a className={styles.ancora}>
                        <CardGroup group={group} />
                    </a>
                </Link>
            )
        })
    }

    function renderGroups() {
        return (
            <div>
                <CadastroGrupo visible={cadastroVisible} setVisible={setCadastroVisible} />

                <CardContainer>
                    <div className={styles.barra_topo}>
                        <SearchFilter onChange={filterGroups} />
                        <RoundedButton label="Adicionar Grupo" buttonKind={ButtonKind.ConfirmButton} onClick={() => setCadastroVisible(true)} />
                    </div>
                    <div className={styles.grupos}>
                        {groupsMapped}
                    </div>
                </CardContainer>
            </div>
        )
    }

    return (
        <div>
            {renderGroups()}
        </div>
    )
}