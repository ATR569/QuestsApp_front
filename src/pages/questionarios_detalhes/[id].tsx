import { Collapse } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import RoundedButton from '../../components/base/RoundedButton'
import CadastroQuestao from '../../components/CadastroQuestao/CadastroQuestao'
import DeletarQuestao from '../../components/DeletarQuestao/DeletarQuestao'
import { UserContext } from '../../contexts/UserContext'
import { Question } from '../../domain/model/question'
import { Questionnaire } from '../../domain/model/questionnaire'
import { api } from '../../services/api'
import styles from '../../styles/pages/questionarios_detalhes.module.css'
import Link from 'next/link'

const { Panel } = Collapse

interface IQuestionnairProps {
    questionnaire: Questionnaire
}

const QuestionnairesDetails = ({ questionnaire }: IQuestionnairProps) => {
    const [visibleQuestion, setVisibleQuestion] = useState(false)
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
    const [questionnaireId, setQuestionnaireId] = useState('')
    const [question, setQuestion] = useState(new Question())
    const { user } = useContext(UserContext)

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

    return (
        <div>
            <CadastroQuestao visible={visibleQuestion} setVisible={setVisibleQuestion} questionnaireId={questionnaireId} creatorId={user.id} />
            <DeletarQuestao visible={visibleModalConfirm} setVisible={setVisibleModalConfirm} question={question} />

            <CardContainer >
                <h1 className={styles.titleHolder}>{questionnaire.discipline}</h1>
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