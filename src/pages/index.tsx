import React from 'react'
import CardContainer from '../components/base/CardContainer'
import styles from '../styles/pages/index.module.css'

interface CardDescription {
    description: string,
    pictureSrc: string
}

const cardDescriptions: Array<CardDescription> = [
    {
        description: 'Crie e compartilhe questionários com seus colegas no QuestsApp e auxilie tanto no seu aprendizado como no de seus colegas.',
        pictureSrc: "/home/img1.jpg"
    },
    {
        description: 'Com o QuestsApp também é possível criar grupos de estudo e vincular seus amigos a eles. Assim fica mais fácil organizar seus questionários e compartilhá-los com os componentes do grupo.',
        pictureSrc: "/home/img2.jpg"
    },
    {
        description: 'Você também pode criar novas questões, responder questões já criadas, comentar e até mesmo avaliar respostas de seus colegas.',
        pictureSrc: "/home/img3.png"
    },
    {
        description: 'No QuestsApp seus questionários criados fiacam disponíves para todos os componentes do grupo de estudos e podem ser organizados por disciplina e tema.',
        pictureSrc: "/home/img4.jpeg"
    },
]

export default class Home extends React.Component {
    private renderDescription(description: string) {
        return (
            <div className={styles.description}> 
                {description} 
            </div>
        )
    }

    private renderPicture(pictureSrc: string) {
        return (
            <div className={styles.picture}> 
                <img src={pictureSrc} alt="image" /> 
            </div>        
        )
    }

    private renderCards(cardDescriptions: Array<CardDescription>) {
        return cardDescriptions.map((cardDescription, index) => {
            return (
                <CardContainer>
                    <div className={styles.cardContent}>
                        {index%2 == 0 ? this.renderDescription(cardDescription.description) : this.renderPicture(cardDescription.pictureSrc)}
                        {index%2 == 0 ? this.renderPicture(cardDescription.pictureSrc) : this.renderDescription(cardDescription.description)}
                    </div>
                </CardContainer>
            )
        })
    }

    render () {
        return (
            <div className={styles.home}>
                { this.renderCards(cardDescriptions) }
            </div>
        )
    }
}

// export default function Home() {
//     return (
//         <div className={styles.home}>
//             {
//                 cardDescriptions.map((cardDescription, index) => {
//                     const descr = <div className={styles.description}> {cardDescription.description} </div>
//                     const pict = <div className={styles.picture}> <img src={cardDescription.pictureSrc} alt="image" /> </div>

//                     return (
//                         <CardContainer>
//                             <div className={styles.cardContent}>
//                                 {index%2 == 0 ? descr : pict}
//                                 {index%2 == 0 ? pict : descr}
//                             </div>
//                         </CardContainer>
//                     )
//                 })
//             }
//         </div>
//     )
// }