import React, { Component } from 'react'
import styles from './RoundedButton.module.css'

export enum ButtonKind {
    ConfirmButton,
    CancelButton
}

interface IButtonProps {
    label: string
    imageSrc?: string
    color?: string
    width?: string
    height?: string
    onClick?: any
    outlined?: boolean,
    buttonKind?: ButtonKind
    submit?: boolean
}

export default class RoundedButton extends Component<IButtonProps, {}> {

    private getBtnKindStyles(buttonKind: ButtonKind | undefined): object {
        switch (buttonKind) {
            case ButtonKind.CancelButton:
                return {
                    backgroundColor: 'white',
                    height: '30px',
                    width: this.props.width,
                    border: '2px solid var(--orange)',
                    color: 'var(--orange)',
                }
            case ButtonKind.ConfirmButton:
                return {
                    backgroundColor: 'var(--orange)',
                    height: '30px',
                    width: this.props.width,
                    border: 'none',
                    color: 'white',
                }
            default:
                return {
                    backgroundColor: this.props.outlined ? '#FFF' : this.props.color || '#FFF',
                    width: this.props.width,
                    height: this.props.height,
                    border: this.props.outlined ? `2px solid ${this.props.color}` : 'none',
                    color: this.props.outlined ? this.props.color : 'black',
                }
        }

    }

    private renderIcon(): any {
        const icon = this.props.imageSrc
        return icon ? <div className={styles.icon}> <img src={icon} alt="Icone" /> </div> : <React.Fragment />
    }

    private renderLabel(): any {
        return <div className={styles.label}>{this.props.label}</div>
    }

    render(): any {
        const btnStyles = this.getBtnKindStyles(this.props.buttonKind)

        return (
            <div className={styles.btnContainer}>
                <button 
                    className={styles.btn} 
                    style={btnStyles} 
                    onClick={this.props.onClick} 
                    type={this.props.submit ? 'submit' : 'button'}>
                        
                    {this.renderIcon()}
                    {this.renderLabel()}
                </button>
            </div>
        )
    }
}