import SideBar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import '../styles/global.css'

import styles from '../styles/app.module.css'

function MyApp({ Component, pageProps }) {
    return (
        <div className={styles.appTemplate}>
            <SideBar />
            <Header title='' subtitle='' imageSrc='/icons/botao-home.svg'/>
            <div className={styles.content}>
                <Component {...pageProps}/>
            </div>
        </div>
    )
}

export default MyApp