import { Collapse } from 'antd'
import React from 'react'
import CardContainer from '../../components/base/CardContainer'
import styles from '../../styles/pages/grupo_detalhes.module.css'
import RoundedButton from '../../components/base/RoundedButton'
import { api } from '../../services/api'
const { Panel } = Collapse

const GroupDetails = ({ group }) => {

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
                <h1 className={styles.titleHolder}>{group.name}</h1>
                <div>
                    <Collapse defaultActiveKey={['0']}>

                        <Panel header={renderButton('Membros', 'Adicionar Membro')} key="1" style={{ background: "#DCDCDC" }} >
                            <div className={styles.containerPanel}>
                                <ul>
                                    {group.members.map(member => {
                                        return (
                                            <li key={member.id}>
                                                <div className={styles.spans}>
                                                    <span>{member.name}</span>
                                                    <span>{member.email}</span>
                                                </div>
                                                <button type="button">
                                                    <img src="/icons/lixeira.svg" alt="Icone de deletar" />
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </Panel>

                        <Panel header={renderButton('Questionários', 'Adicionar Questionários')} key="2" style={{ background: "#DCDCDC" }}>
                            <div className={styles.containerPanel}>
                                <ul>
                                    {group.questionnaires.map(questionnair => {
                                        return (
                                            <li key={questionnair.id}>
                                                <div className={styles.spans}>
                                                    <span>{questionnair.discipline}</span>
                                                    <span>Quantidade de questões: 12</span>
                                                </div>
                                                <button type="button">
                                                    <img src="/icons/lixeira.svg" alt="Icone de deletar" />
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </CardContainer>
        </div>
    )
}

export default GroupDetails

export async function getServerSideProps(ctx) {
    const { id } = ctx.query
    const { data } = await api.get(`groups/${id}`)

    return {
        props: {
            group: data
        }
    }
}