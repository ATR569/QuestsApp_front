import React, { Component} from 'react'
import styles from './RoundedButton.module.css'

interface myProps {
    label: string
    imageSrc?: string
    color: string
    width?: string
    onClick?: any
}

export default class RoundedButton extends Component<myProps, {}> {
    
    private renderIcon(): any {
        const icon = this.props.imageSrc
        return icon ? <div className={styles.icon}> <img src={icon} alt="Icone"/> </div> : <React.Fragment />
    }

    private renderLabel(): any {
        return <div className={styles.label}>{ this.props.label }</div>
    }

    render(): any {
        const btnStyles = {
            backgroundColor: this.props.color,
            width: this.props.width
        }

        return (
            <div className={styles.btnContainer}>
                <button className={styles.btn} style={btnStyles} onClick={this.props.onClick}>
                    {this.renderIcon()}
                    {this.renderLabel()}
                </button>
            </div>  
        )   
    }
}