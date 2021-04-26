import React, { Component } from 'react'

import styles from './InputForm.module.css'

interface myPropos {
    label: string,
    type?: string,
    width?: string,
    value?: string,
    handleChange?: (e) => void,
    onBlur?: any,
    name?: string
}

class InputForm extends Component<myPropos, {}> {
    
    render(): any {
        const typeInput = this.props.type || "text"
        const widthInput = this.props.width || "100%"

        return (
            <div>
                <label className={styles.label}> { this.props.label } </label><br />
                <input 
                    className={styles.input} 
                    style={{ width: widthInput }} 
                    type={typeInput} 
                    {...this.props}
                    onChange={this.props.handleChange}/>
            </div>
        )
    }
}


export default InputForm