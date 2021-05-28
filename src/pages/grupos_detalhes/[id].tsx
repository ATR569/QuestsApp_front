import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import CadastroQuestionario from '../../components/CadastroQuestionario/CadastroQuestionario'
import DeletarQuestionario from '../../components/DeletarQuestionario/DeletarQuestionario'
import DeletarMembro from '../../components/DeletarMembro/DeletarMembro'
import ConvidarMembro from '../../components/ConvidarMembro/ConvidarMembro'
import EditInPlace from '../../components/EditInPlace/EditInPlace'
import styles from '../../styles/pages/grupo_detalhes.module.css'
import RoundedButton, { ButtonKind } from '../../components/base/RoundedButton'
import { api } from '../../services/api'
import { Group } from '../../domain/model/group'
import { Questionnaire } from '../../domain/model/questionnaire'
import Link from 'next/link'
import { AuthService } from '../../services/auth'
import { User } from '../../domain/model/user'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
const { Panel } = Collapse

const URI = 'groups'

interface IGroupProps {
    group: Group
}

const GroupDetails = ({ group }: IGroupProps) => {
    const [visibleAddQuestionnaire, setVisibleAddQuestionnaire] = useState(false)
    const [visibleInvite, setVisibleInvite] = useState(false)
    const [visibleDelQuestionnaire, setVisibleDelQuestionnaire] = useState(false)
    const [visibleDelMember, setVisibleDelMember] = useState(false)
    const [groupId, setGroupId] = useState('')
    const [groupName, setGroupName] = useState('')
    const [questionnaire, setQuestionnaire] = useState(new Questionnaire())
    const [loggedUserId, setLoggedUserId] = useState('')
    const [member, setMember] = useState(new User())

    const grupo = new Group().fromJSON(group)

    useEffect(() => {
        const user = AuthService.decodeToken().user
        setLoggedUserId(user.id)
        setGroupName(group.name)
    }, [])

    function checkAdmin(): boolean {
        return group.administrator.id === loggedUserId
    }

    function renderButton(label: string, buttonLabel: string) {
        return (
            <div className={styles.utilsButtons}>
                <span>{label}</span>
                {buttonLabel == 'Adicionar Questionários' || checkAdmin() ? (
                    <RoundedButton
                        label={buttonLabel}
                        height="1.675rem"
                        outlined={true}
                        color="var(--orange)"
                        onClick={(event) => {
                            event.stopPropagation()
                            label.includes('Membros') ? setVisibleInvite(true) : setVisibleAddQuestionnaire(true)
                            setGroupId(group.id)
                        }}
                    />
                ) : (
                    <>
                    </>
                )}
            </div>
        )
    }

    function handleDelete(event: any, questionnaire: Questionnaire) {
        event.preventDefault()
        setVisibleDelQuestionnaire(true)
        setQuestionnaire(questionnaire)
    }

    function handleDeleteMember(event: any, member: User) {
        event.preventDefault()
        setMember(member)
        setVisibleDelMember(true)
    }

    async function updateGroupName(groupName: string) {
        await api.patch(URI.concat(`/${group.id}`), { name: groupName, administrator: { id: loggedUserId } })
            .then((res: any) => {
                setGroupName(groupName)
                openSuccessNotification('Atualizado com sucesso!')
                setTimeout(() => window.location.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err.response.data)
            })
    }

    return (
        <div>
            <CadastroQuestionario visible={visibleAddQuestionnaire} setVisible={setVisibleAddQuestionnaire} groupId={groupId} />
            <ConvidarMembro visible={visibleInvite} setVisible={setVisibleInvite} groupId={groupId} />
            <DeletarQuestionario visible={visibleDelQuestionnaire} setVisible={setVisibleDelQuestionnaire} questionnaire={questionnaire} />
            <DeletarMembro visible={visibleDelMember} setVisible={setVisibleDelMember} group={group} member={member} />

            <CardContainer >
                <EditInPlace name={groupName} isAdmin={checkAdmin()} onChangeValue={updateGroupName} />

                <div>
                    <Collapse defaultActiveKey={['0']}>

                        <Panel header={renderButton('Membros', 'Convidar Membro')} key="1" style={{ background: "#DCDCDC" }} >
                            {grupo.members.length > 0 ? (
                                <div className={styles.containerPanel}>
                                    <ul>
                                        {grupo.members.map(member => {
                                            return (
                                                <li key={member.id}>
                                                    <div className={styles.spans}>
                                                        <span>{member.name}</span>
                                                        <span>{member.email}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className={styles.buttons}
                                                        onClick={e => handleDeleteMember(e, member)}
                                                        style={checkAdmin() ? {} : { visibility: 'hidden' }} >
                                                        <img src="/icons/lixeira.svg" alt="Icone de deletar" />
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            ) : (<></>)}
                        </Panel>

                        <Panel header={renderButton('Questionários', 'Adicionar Questionários')} key="2" style={{ background: "#DCDCDC" }}>
                            {grupo.questionnaires.length > 0 ? (
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
                                                        <button
                                                            type="button"
                                                            className={styles.buttons}
                                                        >
                                                            <Link href={`/questionarios_detalhes/${questionnair.id}`}>
                                                                <img src="/icons/eye.svg" alt="Icone de visualizar" style={{ width: "28px", height: "28px" }} />
                                                            </Link>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={styles.buttons}
                                                            onClick={e => handleDelete(e, questionnair)}
                                                            style={checkAdmin() ? {} : { visibility: 'hidden' }}
                                                        >
                                                            <img src="/icons/lixeira.svg" alt="Icone de deletar" />
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>

                            ) : (<></>)}
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