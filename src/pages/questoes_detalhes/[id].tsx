import { Collapse } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CardContainer from '../../components/base/CardContainer'
import EditAnswer from '../../components/EditarComentario/EditarComentario'
import EditInPlace from '../../components/EditInPlace/EditInPlace'
import { UserContext } from '../../contexts/UserContext'
import { Answer } from '../../domain/model/answer'
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
    const [visibleEditAnswer, setVisibleEditAnswer] = useState(false)
    const [textAreaRespValue, setTextAreaRespValue] = useState('')
    const [textAreaCommentValue, setTextAreaCommentValue] = useState('')
    const [oldDescription, setOldDescription] = useState('')
    const [answerId, setAnswerId] = useState('')
    const { user } = useContext(UserContext)
    const router = useRouter()

    async function sendAnswer(questionId: string, description: string) {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        const answer = {
            description: description,
            author: {
                id: user.id
            },
            questionId: questionId
        }

        await api.post('/answers', answer, headers)
            .then((res: any) => {
                openSuccessNotification('Enviado com sucesso!')
                setTimeout(() => router.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                }
            })
    }

    async function sendComment(answerId: string, comment: string) {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }

        const answerComment = {
            comment: comment,
            answerId: answerId,
            author: {
                id: user.id
            }
        }

        await api.post('/answercomment', answerComment, headers)
            .then((res: any) => {
                openSuccessNotification('Enviado com sucesso!')
                window.location.reload()
            })
            .catch((err: any) => {
                openErrorNotification(err)
                if (err.response && err.response.status === 401) {
                    AuthService.removeToken()
                    setTimeout(() => router.push('/').then(() => router.reload()), 1000)
                }
            })

    }

    function checkAdmin(creatorAnswerId: string): boolean {
        return creatorAnswerId === user.id
    }

    async function editQuestionDesc(description: string) {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }
        const values = {
            description: description
        }

        await api.patch(`/questions/${question.id}`, values, headers)
            .then((res: any) => {
                openSuccessNotification('Atualizado com sucesso!')
                setTimeout(() => router.reload(), 1000)
            })
            .catch((err: any) => {
                openErrorNotification(err.response.data)
            })
    }

    async function likeAnswer(answerId: string) {
        const headers = { headers: { authorization: `Bearer ${AuthService.getToken()}` } }
        const values = {}

        await api.patch(`/answers/${answerId}/like`, values, headers)
            .then((res: any) => {
                router.reload()
            })
            .catch((err: any) => {
                openErrorNotification(err.response.data)
            })
    }

    return (
        <div>
            <EditAnswer visible={visibleEditAnswer} setVisible={setVisibleEditAnswer} answerId={answerId} oldDescription={oldDescription} />

            <CardContainer >
                <EditInPlace name={question.description} isAdmin={true} onChangeValue={editQuestionDesc} style={{ fontSize: '1.2rem' }} />
                <div className={styles.container}>
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
                                            {checkAdmin(answer.author.id) ? (
                                                <button
                                                    type="button"
                                                    className={styles.btnEditResp}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setVisibleEditAnswer(true)
                                                        setAnswerId(answer.id)
                                                        setOldDescription(answer.description)
                                                    }}
                                                >
                                                    <img src="/icons/editar.svg" alt="Editar Resposta" />
                                                </button>
                                            ) : (<></>)}
                                        </div>
                                    </div>
                                    <div className={styles.containerBtnLike}>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                likeAnswer(answer.id)
                                            }}
                                        >
                                            <img src="/icons/like.svg" alt="Curtir resposta" />
                                        </button>
                                        <span>|</span>
                                        <span>{answer.score}</span>
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
                                                    <div className={styles.containerTextAreaComment} key={answerComment.id}>
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
    const token = ctx.req.cookies.questsapp
    const headers = { headers: { authorization: `Bearer ${token}` } }

    const { id } = ctx.query
    const { data } = await api.get(`questions/${id}`, headers)

    return {
        props: {
            question: data
        }
    }
}