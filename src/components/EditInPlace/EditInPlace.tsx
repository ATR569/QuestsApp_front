import React, { useState, useEffect, useRef } from 'react'
import styles from './EditInPlace.module.css'

interface IFilterProps {
    name: string
    isAdmin?: boolean
    onChangeValue: (any) => void
}

const EditInPlace: React.FC<IFilterProps> = ({ name, isAdmin = false, onChangeValue }) => {
    const inputRef = useRef(null)

    const [isEditing, setIsEditing] = useState(false)

    const edit = () => {
        setIsEditing(true)
    }

    const done = () => {
        onChangeValue(inputRef.current.value)
        setIsEditing(false)
    }

    useEffect(() => {
        if (isEditing) inputRef.current.focus()
    }, [isEditing])

    return (
        <div>
            {isEditing ? (
                <div className={styles.content}>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.button}>
                            <img className={styles.img} src="/icons/fechar.svg" alt="Icone de editar" onClick={e => setIsEditing(false)} />
                        </button>
                        <button type="button" className={styles.button}>
                            <img className={styles.img} src="/icons/check.svg" alt="Icone de editar" onClick={done} />
                        </button>
                    </div>

                    <div className={styles.container_ipt}>
                        <input className={styles.ipt} defaultValue={name} ref={inputRef} type='text' />
                    </div>
                </div>
            ) : (
                <div className={styles.content}>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.button} style={isAdmin ? {} : { visibility: 'hidden' }} >
                            <img className={styles.img} src="/icons/_lapis.svg" alt="Icone de atualizar" onClick={edit} />
                        </button>
                    </div>

                    <h1 className={styles.title} >{name}</h1>
                </div>
            )}
        </div>
    )
}

export default EditInPlace