import React, {useContext} from 'react'
import CardContainer from '../components/base/CardContainer'
import styles from '../styles/pages/index.module.css'

import {TemplateContext} from '../contexts/TemplateContext'

interface CardDescription {
    id: number,
    description: string,
    pictureSrc: string
}

const cardDescriptions: Array<CardDescription> = [
    {
        id: 1,
        description: 'Crie e compartilhe questionários com seus colegas no QuestsApp e auxilie tanto no seu aprendizado como no de seus colegas.',
        pictureSrc: "/home/img1.jpg"
    },
    {
        id: 2,
        description: 'Com o QuestsApp também é possível criar grupos de estudo e vincular seus amigos a eles. Assim fica mais fácil organizar seus questionários e compartilhá-los com os componentes do grupo.',
        pictureSrc: "/home/img2.jpg"
    },
    {
        id: 3,
        description: 'Você também pode criar novas questões, responder questões já criadas, comentar e até mesmo avaliar respostas de seus colegas.',
        pictureSrc: "/home/img3.png"
    },
    {
        id: 4,
        description: 'No QuestsApp seus questionários criados fiacam disponíves para todos os componentes do grupo de estudos e podem ser organizados por disciplina e tema.',
        pictureSrc: "/home/img4.jpeg"
    },
]

export default function Home() {
    const { setPage } = useContext(TemplateContext)
    setPage('inicio')

    function renderDescription(description: string) {
        return (
            <div className={styles.description}> 
                {description} 
            </div>
        )
    }

    function renderPicture(pictureSrc: string) {
        return (
            <div className={styles.picture}> 
                <img src={pictureSrc} alt="image" /> 
            </div>        
        )
    }

    function renderCards(cardDescriptions: Array<CardDescription>) {
        return cardDescriptions.map((cardDescription, index) => {
            return (
                <CardContainer key={cardDescription.id}>
                    <div className={styles.cardContent} key={cardDescription.id}>
                        {index%2 == 0 ? renderDescription(cardDescription.description) : renderPicture(cardDescription.pictureSrc)}
                        {index%2 == 0 ? renderPicture(cardDescription.pictureSrc) : renderDescription(cardDescription.description)}
                    </div>
                </CardContainer>
            )
        })
    }

        return (
            <div className={styles.home}>
                { renderCards(cardDescriptions) }
            </div>
        )
}
