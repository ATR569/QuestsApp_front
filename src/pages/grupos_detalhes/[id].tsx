import { Collapse } from 'antd'
import React, { useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import CadastroQuestionario from '../../components/CadastroQuestionario/CadastroQuestionario'
import DeletarQuestionario from '../../components/DeletarQuestionario/DeletarQuestionario'
import ConvidarMembro from '../../components/ConvidarMembro/ConvidarMembro'
import styles from '../../styles/pages/grupo_detalhes.module.css'
import RoundedButton, { ButtonKind } from '../../components/base/RoundedButton'
import { Modal } from 'antd'
import { api } from '../../services/api'
import { Group } from '../../domain/model/group'
import { Questionnaire } from '../../domain/model/questionnaire'
const { Panel } = Collapse

interface IGroupProps {
    group: Group
}

const GroupDetails = ({ group }: IGroupProps) => {
    const [visibleQuestionnaire, setVisibleQuestionnaire] = useState(false)
    const [visibleInvite, setVisibleInvite] = useState(false)
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
    const [groupId, setGroupId] = useState('')
    const [questionnaire, setQuestionnaire] = useState(new Questionnaire())

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
                        label.includes('Membros') ? setVisibleInvite(true) : setVisibleQuestionnaire(true)
                        setGroupId(group.id)
                    }}
                />
            </div>
        )
    }

    function handleDelete(event: any, questionnaire: Questionnaire) {
        event.preventDefault()
        setVisibleModalConfirm(true)
        setQuestionnaire(questionnaire)
    }

    return (
        <div>
            <CadastroQuestionario visible={visibleQuestionnaire} setVisible={setVisibleQuestionnaire} groupId={groupId} />
            <ConvidarMembro visible={visibleInvite} setVisible={setVisibleInvite} groupId={groupId} />
            <DeletarQuestionario visible={visibleModalConfirm} setVisible={setVisibleModalConfirm} questionnaire={questionnaire} />

            <CardContainer >
                <h1 className={styles.titleHolder}>{grupo.name}</h1>
                <div>
                    <Collapse defaultActiveKey={['0']}>

                        <Panel header={renderButton('Membros', 'Convidar Membro')} key="1" style={{ background: "#DCDCDC" }} >
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
                                                        <img src="/icons/eye.svg" alt="Icone de visualizar" style={{ width: "28px", height: "28px" }} />
                                                    </button>
                                                    <button type="button" className={styles.buttons} onClick={e => handleDelete(e, questionnair)}>
                                                        <img src="/icons/lixeira.svg" alt="Icone de deletar" />
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
        </div >
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