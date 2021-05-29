import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import { Question } from '../../domain/model/question'
import { api } from '../../services/api'
import { AuthService } from '../../services/auth'
import styles from '../../styles/pages/questao_detalhes.module.css'
import { openErrorNotification, openSuccessNotification } from '../../utils/notification'

const { Panel } = Collapse

interface IQuestionProps {
    question: Question
}

const QuestionsDetails = ({ question }: IQuestionProps) => {
    const [creatorId, setCreatorId] = useState('')
    const [textAreaRespValue, setTextAreaRespValue] = useState('')
    const [textAreaCommentValue, setTextAreaCommentValue] = useState('')

    console.log('Question: ', question)

    useEffect(() => {
        const user = AuthService.decodeToken().user
        setCreatorId(user.id)
    }, [])

    async function sendAnswer(questionId: string, description: string) {

        const answer = {
            description: description,
            author: {
                id: creatorId
            },
            questionId: questionId
        }

        await api.post('/answers', answer)
            .then((res: any) => {
                openSuccessNotification('Enviado com sucesso!')
                window.location.reload()
            })
            .catch((err: any) => {
                openErrorNotification(err.response.data)
            })
    }

    async function sendComment(answerId: string, comment: string) {

        const answerComment = {
            comment: comment,
            answerId: answerId,
            author: {
                id: creatorId
            }
        }

        await api.post('/answercomment', answerComment)
            .then((res: any) => {
                openSuccessNotification('Enviado com sucesso!')
                window.location.reload()
            })
            .catch((err: any) => {
                openErrorNotification(err.response.data)
            })

    }

    function checkAdmin(creatorAnswerId: string): boolean {
        return creatorAnswerId === creatorId
    }

    async function editComment() {

    }

    return (
        <div>
            <CardContainer >
                <div className={styles.container}>
                    <h1 className={styles.description}>{question.description}</h1>
                    <div className={styles.containerResp}>
                        <div className={styles.resp}>
                            <div className={styles.textAreaResp}>
                                <textarea
                                    className={styles.textAreaRes}
                                    rows={5}
                                    cols={112}
                                    value={textAreaRespValue}
                                    onChange={(event) => {
                                        setTextAreaRespValue(event.target.value)
                                    }}
                                />
                            </div>
                            <div className={styles.btn}>
                                <button
                                    type="button"
                                    className={styles.btnTextSendRes}
                                    onClick={() => sendAnswer(question.id, textAreaRespValue)}
                                >
                                    <img src="/icons/send.svg" alt="Enviar Resposta" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {question.answers.length > 0 ? (
                        question.answers.map(answer => {
                            return (
                                <div className={styles.containerResp} key={answer.id}>
                                    <div className={styles.resp}>
                                        <div className={styles.respDescription}>
                                            <span>{answer.description}</span>
                                        </div>
                                        <div className={styles.btn}>
                                            <button type="button" className={styles.btnEditResp}>
                                                <img src="/icons/editar.svg" alt="Editar Resposta" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.containerComments}>
                                        <div className={styles.containerNewComment}>
                                            <div className={styles.containerTextAreaComment}>
                                                <textarea
                                                    rows={2}
                                                    cols={112}
                                                    className={styles.textAreaComment}
                                                    onChange={(event) => {
                                                        setTextAreaCommentValue(event.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.btn}>
                                                <button
                                                    type="button"
                                                    onClick={() => sendComment(answer.id, textAreaCommentValue)}
                                                >
                                                    <img src="/icons/send.svg" alt="Enviar Comentario" />
                                                </button>
                                            </div>
                                        </div>
                                        {answer.answerComments.length > 0 ? (
                                            answer.answerComments.map(answerComment => {
                                                return (
                                                    <div className={styles.containerTextAreaComment}>
                                                        <textarea
                                                            key={answerComment.id}
                                                            className={styles.textAreaComment}
                                                            rows={4}
                                                            cols={112}
                                                            readOnly
                                                            value={answerComment.comment}
                                                            onChange={(event) => { }}
                                                        />
                                                    </div>
                                                )
                                            })
                                        ) : (<></>)}
                                    </div>
                                </div>
                            )
                        })
                    ) : (<></>)}
                </div>
            </CardContainer>
        </div >
    )
}

export default QuestionsDetails

export async function getServerSideProps(ctx) {
    const { id } = ctx.query
    const { data } = await api.get(`questions/${id}`)

    return {
        props: {
            question: data
        }
    }
}