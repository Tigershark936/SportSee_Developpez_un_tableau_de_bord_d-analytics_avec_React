import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

// Liste des profils à afficher
const profiles = [
  { id: 12, name: "KARL" },
  { id: 18, name: "CECILIA" },
  { id: 55, name: "MOCK" } // Toujours mock
];

const Home = () => {
    return (
        <div className={styles.container}>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Choisis un profil</legend>

                {/* On boucle sur chaque profil */}
                {profiles.map((profile) => (
                    <Link key={profile.id} to={`/profile/${profile.id}`}>
                        <button className={styles.button}>
                        USER {profile.id} : {profile.name}
                        </button>
                    </Link>
                ))}
            </fieldset>
        </div>
    )
}

export default Home