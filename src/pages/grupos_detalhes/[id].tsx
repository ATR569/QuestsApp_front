import { Collapse } from 'antd'
import React from 'react'
import CardContainer from '../../components/base/CardContainer'

import styles from '../../styles/pages/grupo_detalhes.module.css'

import { useRouter } from 'next/router'

import data from '../../services/teste.json'
import RoundedButton from '../../components/base/RoundedButton'

const { Panel } = Collapse;


function grupos_detalhes() {

    const router = useRouter()
    const { id } = router.query

    console.log("ID: ", id)

    const grupo = {
        descricao: 'Grupo de Estudos ATRJ',
        members: [''],
        questionarios: ['']
    }

    function renderButton(label: string, buttonLabel: string) {
        return (
            <div className={styles.utilsButtons}>
                <span>{label}</span>
                <RoundedButton
                    label={buttonLabel}
                    height="1.675rem"
                    outlined={true}
                    color="var(--orange)"
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                />
            </div>
        )
    }

    return (
        <div>
            <CardContainer >
                <h1 className={styles.titleHolder}>{grupo.descricao}</h1>
                <div>
                    <Collapse defaultActiveKey={['0']}>

                        <Panel header={renderButton('Membros', 'Adicionar Membro')} key="1" style={{ background: "#DCDCDC" }} >
                            <div className={styles.members}>
                                <ul>
                                    {data.grupos.map(grupo => grupo.members.map(member => {
                                        return (
                                            <li key={grupo.id}>
                                                <div className={styles.spans}>
                                                    <span>{member.nome}</span>
                                                    <span>{member.email}</span>
                                                </div>
                                                <button type="button">
                                                    <img src="/icons/lixeira.svg" alt="Icone de deletar" />
                                                </button>
                                            </li>
                                        )
                                    }))}
                                </ul>
                            </div>
                        </Panel>

                        <Panel header={renderButton('Questionários', 'Adicionar Questionários')} key="2" style={{ background: "#DCDCDC" }}>

                        </Panel>
                    </Collapse>
                </div>
            </CardContainer>
        </div>
    )
}

export default grupos_detalhes
