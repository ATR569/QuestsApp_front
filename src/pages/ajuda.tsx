import React, { useContext, useEffect } from 'react'
import CardContainer from '../components/base/CardContainer'
import styles from '../styles/pages/ajuda.module.css'
import { TemplateContext } from '../contexts/TemplateContext'
import { Collapse } from 'antd';

const { Panel } = Collapse;

export default function Ajuda() {
    const { changePage } = useContext(TemplateContext)

    useEffect(() => {
        changePage('ajuda')
    }, [])

    var question1 = "Como criar um novo grupo?";
    var answer1 = "Ao acessar o menu lateral, selecione a opção meus grupos, na página “meus grupos” você irá encontrar na parte superior o botão adicionar grupo. Ao clicar no botão você será direcionado para tela de onde será preenchido as informações do novo grupo."
    function renderQuestions() {
        return (

            <div className={styles.ajuda}>
                <CardContainer >
                    <div >
                        <div className={styles.titleHolder}>
                            <h2>Dúvidas Frequentes</h2>
                        </div>
                        <Collapse defaultActiveKey={['0']}>
                            <Panel header={question1} key="1">
                                <p className={styles.question}> {answer1}</p>
                            </Panel>
                            <Panel header="Como adicionar um usuário ao grupo?" key="2">
                                <p className={styles.question}>Acesse no menu lateral a opção meus grupos, na página de grupos selecione qual o grupo você deseja adicionar um usuário,
                                    ao acessar o grupo clique no botão adicionar usuário e selecione-o.</p>
                            </Panel>
                            <Panel header="Como criar um novo questionário?" key="3">
                                <p className={styles.question}>Ao selecionar no menu lateral a opção “meus grupos”, você será direcionado para página de grupos, lá selecione qual o grupo
                                    você deseja adicionar um novo questionário, ao acessar o grupo clique no botão adicionar questionário.</p>
                            </Panel>
                            <Panel header="Como adicionar uma nova questão a um questionário?" key="4">
                                <p className={styles.question}>Acesse a opção “meus questionários" no menu lateral, e clique no questionário que você quer adicionar uma nova questão,
                                    ao abrir o questionário clique no botão adicionar questão.</p>
                            </Panel>
                            <Panel header="Como responder uma questão? " key="5">
                                <p className={styles.question}>Navegue até a aba meus grupos de estudo no menu lateral, selecione o grupo de estudos e clique para expandir.
                                    Selecione o questionário Para visualizar as questões e abaixo da questão que deseja responder clique no botão responder
                                    questão e digite sua resposta.</p>
                            </Panel>
                            <Panel header="Como editar as minhas informações de usuário?" key="6">
                                <p className={styles.question}>No menu lateral, clique na opção “dados cadastrais", onde você irá para a tela para visualizar os dados cadastrados
                                    e clicar no botão editar dados, localizado na parte superior. </p>
                            </Panel>
                            <Panel header="Como alterar minha senha?" key="7">
                                <p className={styles.question}>No menu lateral, clique na opção “dados cadastrais", onde você irá para a tela para visualizar os dados cadastrados
                                    e na parte inferior você encontrará a área de senhas, onde você poderá cadastrar uma nova senha. </p>
                            </Panel>
                        </Collapse>
                    </div>
                </CardContainer>

            </div>


        )
    }




    return (
        <div className={styles.home}>
            {renderQuestions()}
        </div>
    )
}
