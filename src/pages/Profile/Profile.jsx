import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import UserGreeting from '../../components/UserGreeting/UserGreeting';
import NutritionStatCard from '../../components/NutritionStatCard/NutritionStatCard';
import styles from './Profile.module.scss';
import NotFound from '../NotFound/NotFound';
import Loader from '../../components/Loader/Loader';
import MyBarChart from '../../components/Charts/BarChart/BarChart';
import MyLineChart from '../../components/Charts/LineChart/LineChart';
import MyRadarChart from '../../components/Charts/RadarChart/RadarChart';
import MyRadialBarChart from '../../components/Charts/RadialBarChart/RadialBarChart';

import fire from '../../assets/fire-calori.svg';
import chicken from '../../assets/chicken-protein.svg';
import apple from '../../assets/apple-glucide.svg';
import burger from '../../assets/cheeseburger-lipid.svg';

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

    const { data: averageSessions, isLoading: isAverageSessions, error: averageSessionsError} = useFetch(
       `http://localhost:3000/user/${userId}/average-sessions` 
    )
    console.log('moyenne des sessions', averageSessions);    

    const { data: performance, isLoading: isPerformance, error: performanceError } = useFetch(
        `http://localhost:3000/user/${userId}/performance`
    )
    console.log('performance', performance);
       
    // Je regroupe tous les isLoading individuels
    const isLoadingGlobal = isLoading || isActivityLoading || isAverageSessions || isPerformance
    // Je regroupe toutes les error individuelles
    const hasError = error || activityError || averageSessionsError || performanceError
    
    // Gestion des erreurs
    if (hasError) {
        return < NotFound />
    }

     // Gestion du chargement
    if (isLoadingGlobal) {
        return < Loader />;
    }
    
    // Extraire le prénom (en vérifiant que data existe)
    const firstName = data.data.userInfos.firstName;

    return (
        <>
            <div className={styles.container}>
                <UserGreeting 
                    firstname={firstName} 
                />
            </div>
            <section className={styles.dashboardSection}>
                <div className={styles.graphics}>
                    <div className={styles.barchart}>
                        <p className={styles.barChartTitle} >Activité quotidienne</p>
                        <MyBarChart
                            activity={activity?.data?.sessions || []}
                        />
                    </div>
                    <div className={styles.otherchart}>
                        <MyLineChart 
                            sessions={averageSessions?.data?.sessions || []}
                        />
                        <MyRadarChart 
                            performance={
                                performance?.data?.data?.map(item => ({
                                    kind: performance.data.kind[item.kind],
                                    value: item.value
                                })) || []
                            }
                        />
                        <MyRadialBarChart 
                            score={data?.data?.todayScore ?? data?.data?.score ?? ''}
                        />
                    </div>

                </div>
                <aside className={styles.dashboardAside}>
                    <NutritionStatCard 
                        logo={fire} 
                        alt="Fire icon"
                        valueNutrient={data?.data?.keyData?.calorieCount || ''}
                        unit='kCal'
                        nutrient='Calories'
                        categorie='calories'
                    />
                    <NutritionStatCard 
                        logo={chicken}
                        alt="Chicken icon"
                        valueNutrient={data?.data?.keyData?.proteinCount || ''}
                        unit='g'
                        nutrient='Protéines'
                        categorie='protein'
                    />
                    <NutritionStatCard 
                        logo={apple} 
                        alt="Apple icon"
                        valueNutrient={data?.data?.keyData?.carbohydrateCount || ''}
                        unit='g'
                        nutrient='Glucides'
                        categorie='glucides'
                    />
                    <NutritionStatCard 
                        logo={burger} 
                        alt="Cheeseburger icon"
                        valueNutrient={data?.data?.keyData?.lipidCount || ''}
                        unit='g'
                        nutrient="lipides"
                        categorie='lipides'
                    />
                </aside>
            </section>
        </>
    )

}

export default Profile