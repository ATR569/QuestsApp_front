import React, { useContext, useEffect } from 'react'
import CardGroup from '../components/base/CardGroup'
import CardContainer from '../components/base/CardContainer'
import SearchFilter from '../components/base/SearchFilter'
import RoundedButton, { ButtonKind } from '../components/base/RoundedButton'
import styles from '../styles/pages/grupos.module.css'
import { TemplateContext } from '../contexts/TemplateContext'
import Group from '../model/Group'

export default function Grupo() {
    const { changePage } = useContext(TemplateContext)

    useEffect(() => {
        changePage('grupos')
    }, [])

    function gerarGrupo(): Group {
        const group: Group = new Group()

        group.descricao = `Grupo 0${Math.floor(Math.random() * (10000 - 1) + 1)}`
        group.members = new Array(Math.floor(Math.random() * (11 - 1) + 3))
        group.questionnaires = new Array(Math.floor(Math.random() * (10 - 1) + 1))

        return group
    }

    function renderGroups() {
        return (
            <div>
                <CardContainer>
                    <div className={styles.barra_topo}>
                        <SearchFilter />
                        <RoundedButton label="Adicionar Grupo" buttonKind={ButtonKind.ConfirmButton} />
                    </div>
                    <div className={styles.grupos}>
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
                        <CardGroup group={gerarGrupo()} />
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