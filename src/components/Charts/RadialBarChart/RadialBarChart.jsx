import PropTypes from 'prop-types';
import styles from './RadialBarChart.module.scss'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const MyRadialBarChart = ({score}) => {
    // Convertit le score en pourcentage entier :
    // - Si score est ≤ 1, on considère que c'est une valeur décimale (ex: 0.69 pour 69%)
    //   → on multiplie par 100 pour obtenir le pourcentage.
    // - Sinon, on considère que le score est déjà en pourcentage (ex: 69).
    // Math.round() sert à arrondir le résultat à l'entier le plus proche.
    const percent = Math.round(score <= 1 ? score * 100 : score);
    // Data attendue par <RadialBar/> : un tableau d’objets { name, value }
    const dataArray = [{ name: 'score', value: score }]

    // Calcul des angles pour RadialBar
    const start = 90; // démarre en haut
    const end = start + (percent / 100) * 360

    return (
        <div className={styles.wrapper}>
            <p className={styles.RadialBarChartTitle}>Score</p>

            <ResponsiveContainer 
                className={styles.RadialBarChart} 
                width={258} 
                height={263}
            >
                <RadialBarChart 
                    cx="50%" cy="50%" 
                    innerRadius="30%" 
                    outerRadius="90%"
                    barSize={10} // épaisseur de l'anneau
                    data={dataArray}
                    startAngle={start}
					endAngle={end}
                >
                    <circle
                        cx="50%" cy="50%"
                        r="80" // ajuste le rayon pour remplir juste le centre
                        fill="#fff"
                    />
                    <RadialBar
                        dataKey="value"
                        minAngle={15}
                        cornerRadius={100}
                        fill="#e60000ff"
                        clockWise
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            <div className={styles.LabelRadialBarChart}>
                <span className={styles.span}>{percent}%</span>
                <p>de votre</p>
                <p>objectif</p>
            </div>
        </div>
    );
}

MyRadialBarChart.propTypes = {
    /**
    * Vérification des props de MyRadialBarChart
    *
    * - score : number OBLIGATOIRE
    */
    score: PropTypes.number.isRequired,
};

export default MyRadialBarChart