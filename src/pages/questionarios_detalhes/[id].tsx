import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import RoundedButton from '../../components/base/RoundedButton'
import CadastroQuestao from '../../components/CadastroQuestao/CadastroQuestao'
import DeletarQuestao from '../../components/DeletarQuestao/DeletarQuestao'
import { Question } from '../../domain/model/question'
import { Questionnaire } from '../../domain/model/questionnaire'
import { api } from '../../services/api'
import { AuthService } from '../../services/auth'
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
    const [creatorId, setCreatorId] = useState('')
    const [question, setQuestion] = useState(new Question())

    useEffect(() => {
        const user = AuthService.decodeToken().user
        setCreatorId(user.id)
    }, [])

    function checkAdmin(creatorQuestionId: string, loggedUserId: string): boolean {
        return creatorQuestionId === loggedUserId
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
            <CadastroQuestao visible={visibleQuestion} setVisible={setVisibleQuestion} questionnaireId={questionnaireId} creatorId={creatorId} />
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

                                                        {checkAdmin(questions.creator.id, creatorId) ? (
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

export async function getServerSideProps(ctx) {
    const { id } = ctx.query
    const { data } = await api.get(`questionnaires/${id}`)

    return {
        props: {
            questionnaire: data
        }
    }
}