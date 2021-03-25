import React, { Component } from 'react'

import styles from './InputForm.module.css'

class InputForm extends Component<{ label: string, type?: string }, {}> {

    render(): any {
        const typeInput = this.props.type || "text"

        return (
            <div>
                <div>
                    <label className={styles.label}>{this.props.label}</label><br />
                    <input className={styles.input} type={typeInput} />
                </div>
            </div>
        )
    }
}

export default InputForm