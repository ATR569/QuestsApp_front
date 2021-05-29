import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

interface IGroup {
    id: string,
    name: string,
}

export default function Teste() {
    const [ groups, setGroups ] = useState<IGroup[]>([])

    useEffect(() => {
        api.get<IGroup[]>('groups')
            .then((res) => {setGroups(res.data)})
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <span>{groups[0] && groups[0].name}</span>
        </>
    )
}
