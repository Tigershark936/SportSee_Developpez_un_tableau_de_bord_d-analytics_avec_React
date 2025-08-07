import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
    // Ici tu appelles ton hook avec une URL pour tester
    return (
        <>
            <Link to='/profile/12'>
                <button className={styles.button}>1er bouton</button>
            </Link>
            <Link to='/profile/18'>
                <button className={styles.button}>2eme bouton</button>
            </Link>
        </>
    )
}

export default Home