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

const URI = 'groups'

export default function Grupo() {

    const { changePage } = useContext(TemplateContext)
    const [visible, setVisible] = useState(false)
    const [groups, setGroups] = useState([])

    useEffect(() => {
        changePage('grupos')
        getGroups()
    }, [])

    async function getGroups() {
        await api.get(URI)
            .then((res: any) => {
                setGroups(res.data)
            })
            .catch((err: any) => openErrorNotification(err.response.data))
    }

    function mapGroups() {
        const gruposMap: Array<Group> = []

        groups.forEach((group: Group) => gruposMap.push(group))

        return gruposMap.map((group, index) => {
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
                <CadastroGrupo visible={visible} setVisible={setVisible} />

                <CardContainer>
                    <div className={styles.barra_topo}>
                        <SearchFilter />
                        <RoundedButton label="Adicionar Grupo" buttonKind={ButtonKind.ConfirmButton} onClick={() => setVisible(true)} />
                    </div>
                    <div className={styles.grupos}>
                        {mapGroups()}
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