import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to='/'>

            </Link>
            <nav className={styles.nav}>
                <Link to='/' className={styles.link}>Accueil</Link>
                <Link to='/Profile' className={styles.link}>Profil</Link>
                <Link to='/Settings' className={styles.link}>Réglage</Link>
                <Link to='/Community' className={styles.link}>Communauté</Link>
            </nav>
        </header>
    )
}

export default Header