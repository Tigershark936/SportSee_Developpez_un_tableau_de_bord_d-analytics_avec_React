import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import UserGreeting from '../../components/UserGreeting/UserGreeting';
import NutritionStatCard from '../../components/NutritionStatCard/NutritionStatCard';
import styles from './Profile.module.scss';

// import fire from '../../assets/fire-calori.svg';
// import chicken from '../../assets/chicken-protein.svg';
// import apple from '../../assets/apple-glucide.svg';
// import burger from '../../assets/cheeseburger-lipid.svg';

const Profile = () => {
    // Me permet de récuperer le paramètre userId
    const { userId } = useParams()
    console.log(userId);

    const {data, isLoading, error} = useFetch(
        `http://localhost:3000/user/${userId}`
    );
    console.log('data', data);

    const { data: activity, isLoading: isActivityLoading, error: activityError } = useFetch(
        `http://localhost:3000/user/${userId}/activity`
    );
    console.log('activity', activity);   

    // Je regroupe tous les isLoading individuels
    const isLoadingGlobal = isLoading || isActivityLoading
    // Je regroupe toutes les error individuelles
    const hasError = error || activityError 
    
    // Gestion des erreurs
    if (hasError) {
        return < NotFound />
    }

     // Gestion du chargement
    if (isLoadingGlobal) {
        return <p>Chargement...</p>;
    }
    
    // Extraire le prénom (en vérifiant que data existe)
    const firstName = data?.data?.userInfos?.firstName || '';

    return (
        <>
            <div className={styles.container}>
                <UserGreeting 
                    firstname={firstName} 
                />
            </div>
            <section className={styles.DashboardSection}>
                <div className={styles.graphics}>
                    <div className={styles.barchart}>BarChart</div>
                    <div className={styles.otherchart}>
                        <div>LineChart.</div>
                        <div>d’un radar chart.</div>
                        <div>RadialBarChart.</div>
                    </div>

                </div>
                <NutritionStatCard />
            </section>
        </>
    )

}

export default Profile