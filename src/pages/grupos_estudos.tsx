import React, { useContext, useEffect, useState } from 'react'
import CardGroup from '../components/base/CardGroup'
import CardContainer from '../components/base/CardContainer'
import CadastroGrupo from '../components/CadastroGrupo/CadastroGrupo'
import SearchFilter from '../components/base/SearchFilter'
import RoundedButton, { ButtonKind } from '../components/base/RoundedButton'
import styles from '../styles/pages/grupos.module.css'
import { TemplateContext } from '../contexts/TemplateContext'
import Group from '../model/Group'
import Link from 'next/link'

export default function Grupo() {
    const { changePage } = useContext(TemplateContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        changePage('grupos')
    }, [])


    function gerarGrupo(): Group {
        const group: Group = new Group()

        group.id = '507f1f77bcf86cd799439011'
        group.descricao = `Grupo 0${Math.floor(Math.random() * (10000 - 1) + 1)}`
        group.members = new Array(Math.floor(Math.random() * (11 - 1) + 3))
        group.questionnaires = new Array(Math.floor(Math.random() * (10 - 1) + 1))

        return group
    }

    function getGroups(): Array<Group> {
        const grupos: Array<Group> = []

        grupos.push(gerarGrupo())
        grupos.push(gerarGrupo())
        grupos.push(gerarGrupo())
        grupos.push(gerarGrupo())
        grupos.push(gerarGrupo())
        grupos.push(gerarGrupo())
        grupos.push(gerarGrupo())

        return grupos
    }

    function mapGroups(grupos: Array<Group>) {
        return grupos.map(group => {
            return (
                <Link href={`/grupos_detalhes/${group.id}`}>
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
                        {mapGroups(getGroups())}
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