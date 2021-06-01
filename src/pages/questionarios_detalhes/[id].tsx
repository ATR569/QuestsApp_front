import { Collapse } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import RoundedButton from '../../components/base/RoundedButton'
import CadastroQuestao from '../../components/CadastroQuestao/CadastroQuestao'
import DeletarQuestao from '../../components/DeletarQuestao/DeletarQuestao'
import EditInPlace from '../../components/EditInPlace/EditInPlace'
import { UserContext } from '../../contexts/UserContext'
import { Question } from '../../domain/model/question'
import { Questionnaire } from '../../domain/model/questionnaire'
import { api } from '../../services/api'
import styles from '../../styles/pages/questionarios_detalhes.module.css'
import Link from 'next/link'
import { AuthService } from '../../services/auth'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'
import router from 'next/router'

const { Panel } = Collapse

const URI = 'questionnaires'

interface IQuestionnairProps {
    questionnaire: Questionnaire
}

const QuestionnairesDetails = ({ questionnaire }: IQuestionnairProps) => {
    const [visibleQuestion, setVisibleQuestion] = useState(false)
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
    const [questionnaireId, setQuestionnaireId] = useState('')
    const [questionnaireDiscipline, setQuestionnaireDiscipline] = useState('')
    const [question, setQuestion] = useState(new Question())
    const { user } = useContext(UserContext)

    useEffect(() => {
        setQuestionnaireDiscipline(questionnaire.discipline)
    }, [])

    function checkAdmin(creatorQuestionId: string): boolean {
        return creatorQuestionId === user.id
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
                        setVisibleQuestion(true)
                        setQuestionnaireId(questionnaire.id)
                    }}
                />
            </div>
        )
    }

    function handleDelete(event: any, question: Question) {
        event.preventDefault()
        setVisibleModalConfirm(true)
        setQuestion(question)
    }

    async function updateDiscipline(discipline: string) {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        const values = { discipline }

        await api.patch(URI.concat(`/${questionnaire.id}`), values, headers)
            .then((res: any) => {
                setQuestionnaireDiscipline(discipline)
                openSuccessNotification('Atualizado com sucesso!')
                setTimeout(() => router.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
            })
    }

    return (
        <div>
            <CadastroQuestao visible={visibleQuestion} setVisible={setVisibleQuestion} questionnaireId={questionnaireId} creatorId={user.id} />
            <DeletarQuestao visible={visibleModalConfirm} setVisible={setVisibleModalConfirm} question={question} />

            <CardContainer >
                <EditInPlace name={questionnaireDiscipline} isAdmin={true} onChangeValue={updateDiscipline} />

                <div>
                    <Collapse defaultActiveKey={['0']}>
                        <Panel header={renderButton('Questões', 'Criar Questão')} key="1" style={{ background: "#DCDCDC" }} >
                            {questionnaire.questions.length > 0 ? (
                                <div className={styles.containerPanel}>
                                    <ul>
                                        {questionnaire.questions.map(questions => {
                                            return (
                                                <li key={questions.id}>
                                                    <div className={styles.spans}>
                                                        <span style={{ textAlign: 'justify', marginRight: '10px' }}>{`Descrição: ${questions.description}`}</span>
                                                        <span>{`Criador da questão: ${questions.creator.name}`}</span>
                                                    </div>
                                                    <div className={styles.containerButton}>
                                                        <button type="button" className={styles.buttons}>
                                                            <Link href={`/questoes_detalhes/${questions.id}`}>
                                                                <img src="/icons/eye.svg" alt="Icone de visualizar" style={{ width: "28px", height: "28px" }} />
                                                            </Link>
                                                        </button>

                                                        {checkAdmin(questions.creator.id) ? (
                                                            <button
                                                                type="button"
                                                                className={styles.buttons}
                                                                onClick={e => handleDelete(e, questions)}
                                                            >
                                                                <img src="/icons/lixeira.svg" alt="Icone de deletar" />
                                                            </button>

                                                        ) : (
                                                            <>
                                                            </>
                                                        )}
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

export default QuestionnairesDetails

export async function getServerSideProps(ctx: any) {
    const token = ctx.req.cookies.questsapp
    const headers = { headers: { authorization: `Bearer ${token}` } }

    const { id } = ctx.query
    const result = await api.get(`questionnaires/${id}`, headers)

    return result ? { props: { questionnaire: result.data } } : { props: { questionnaire: undefined } }
}