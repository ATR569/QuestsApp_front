import { Collapse } from 'antd'
import React from 'react'
import CardContainer from '../../components/base/CardContainer'
import styles from '../../styles/pages/grupo_detalhes.module.css'
import RoundedButton from '../../components/base/RoundedButton'
import { api } from '../../services/api'
import { Group } from '../../domain/model/group'
const { Panel } = Collapse

interface IGroupProps {
    group: Group
}

const GroupDetails = ({ group }: IGroupProps) => {

    // console.log('Group: ', group)
    const grupo = new Group().fromJSON(group)

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
                <h1 className={styles.titleHolder}>{grupo.name}</h1>
                <div>
                    <Collapse defaultActiveKey={['0']}>

                        <Panel header={renderButton('Membros', 'Adicionar Membro')} key="1" style={{ background: "#DCDCDC" }} >
                            <div className={styles.containerPanel}>
                                <ul>
                                    {grupo.members.map(member => {
                                        return (
                                            <li key={member.id}>
                                                <div className={styles.spans}>
                                                    <span>{member.name}</span>
                                                    <span>{member.email}</span>
                                                </div>
                                                <button type="button" className={styles.buttons}>
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
                                    {grupo.questionnaires.map(questionnair => {
                                        return (
                                            <li key={questionnair.id}>
                                                <div className={styles.spans}>
                                                    <span>{questionnair.discipline}</span>
                                                    <span>{`Número de Questões: ${questionnair.questionsCount}`}</span>
                                                </div>
                                                <div className={styles.containerButton}>
                                                    <button type="button" className={styles.buttons}>
                                                        <img src="/icons/eye.svg" alt="Icone de deletar" style={{ width: "28px", height: "28px" }}/>
                                                    </button>
                                                    <button type="button" className={styles.buttons}>
                                                        <img src="/icons/lixeira.svg" alt="Icone de deletar"/>
                                                    </button>
                                                </div>
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