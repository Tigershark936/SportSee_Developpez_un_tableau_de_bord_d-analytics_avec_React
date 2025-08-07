import PropTypes from 'prop-types';
import styles from './NutritionStatCard.module.scss';

const NutritionStatCard = ({ logo, alt, unit}) => {
    return (
        <div className={styles.cardNutrients}>
			<div className={styles.cardIconWrapper}>
				<img src={logo} alt={alt} className={styles.calorieIcon} />
			</div>
			<div className={styles.cardDataWrapper}>
				<p className={styles.valueNutrient}>1520{unit}</p>
				<p className={styles.titleNutrient}>Protéines</p>
			</div>
		</div>
    )

}

NutritionStatCard.PropTypes = {

}

export default NutritionStatCard