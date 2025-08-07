import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import UserGreeting from '../../components/UserGreeting/UserGreeting';
import styles from './Profile.module.scss';

const Profile = () => {
    // Me permet de récuperer le paramètre userId
    const { userId } = useParams()
    console.log(userId);

    const {data, isLoading, error} = useFetch(
        `http://localhost:3000/user/${userId}`
    );
    console.log('data', data);
    
    // Gestion des erreurs
    if (error) {
        return < NotFound />
    }

     // Gestion du chargement
    if (isLoading) {
        return <p>Chargement...</p>;
    }
    
    // Extraire le prénom (en vérifiant que data existe)
    const firstName = data?.data?.userInfos?.firstName || '';

    return (
        <div className={styles.container}>
            <UserGreeting 
                firstname={firstName} 
            />
        </div>
    )

}

export default Profile