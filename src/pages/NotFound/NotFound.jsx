import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>404</h1>
            <h2 className={styles.h2}>Oups! La page que <span>vous demandez n'existe pas.</span></h2>
            <Link to='/'>  
            <p className={styles.p}>Retourner sur la page d’accueil</p>
            </Link>
        </div>
    )
}

export default NotFound