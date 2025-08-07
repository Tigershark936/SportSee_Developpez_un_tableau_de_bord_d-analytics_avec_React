import PropTypes from 'prop-types';
import styles from './NutritionStatCard.module.scss';

const NutritionStatCard = ({ logo, alt, categorie, valueNutrient, unit, nutrient}) => {
    return (
        <div className={styles.cardNutrients}>
			<div className={`${styles.cardIconWrapper} ${styles[`cardIconWrapper--${categorie}`]}`}>
				<img src={logo} alt={alt} className={styles.calorieIcon} />
			</div>
			<div className={styles.cardDataWrapper}>
				<p className={styles.valueNutrient}>{valueNutrient}{unit}</p>
				<p className={styles.titleNutrient}>{nutrient}</p>
			</div>
		</div>
    )

}

NutritionStatCard.PropTypes = {

    logo: PropTypes.string,
    valueNutrient: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    nutrient: PropTypes.string.isRequired,
}

export default NutritionStatCard