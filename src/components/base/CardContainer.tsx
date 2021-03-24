import React, { Component } from 'react'

import styles from './CardContainer.module.css'

class CardContainer extends Component {
    private renderOrnament(): any {
        return <div className={styles.ornament} />
    }

    private renderContent(): any {
        return (
            <div className={styles.cardContent}>
                {this.props.children}
            </div>
        )

    }

    render(): any {
        return (
            <div className={styles.card}>
                {this.renderOrnament()}
                {this.renderContent()}
            </div>
        )
    }
}

export default CardContainer