import React, { Component } from 'react'
import Group from '../../model/Group'

import styles from './CardGroup.module.css'

interface IGroupProps {
    group: Group
}

export default class CardGroup extends Component<IGroupProps, {}> {

    render(): any {

        const group: Group = this.props.group

        return (
            <div className={styles.card_group}>

                <div className={styles.container_img}>
                    <img src='icons/group.svg' className={styles.img}></img>
                </div>

                <div className={styles.title_group}>
                    <span>{group.descricao}</span>
                </div>

                <div className={styles.informations}>
                    <span>{`${group.getMembersCount()} Membros`}</span>
                    <span>{`${group.getQuestionnairesCount()} Questionários`}</span>
                    <span>57 Questões</span>
                </div>

                <div className={styles.effect} />
            </div>
        )
    }
}