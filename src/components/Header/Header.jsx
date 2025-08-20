import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logoRunner.png';
import LogoName from '../../assets/logoNameSite.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to='/' className={styles.linkLogo}>
                <img src={logo} alt='Runner Logo' className={styles.logo}/>
                <img src={LogoName} alt='SportSee Logo'/>
            </Link>
            <nav className={styles.nav}>
                <NavLink 
                    to='/' 
                    className={({isActive}) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Accueil
                </NavLink>
                <NavLink 
                    to='/Profile' 
                    className={({isActive}) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Profil
                </NavLink>
                <NavLink 
                    to='/Settings' 
                    className={({isActive}) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Réglages
                </NavLink>
                <NavLink 
                    to='/Community' 
                    className={({isActive}) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                >
                    Communauté
                </NavLink>
            </nav>
        </header>
    )
}

export default Header