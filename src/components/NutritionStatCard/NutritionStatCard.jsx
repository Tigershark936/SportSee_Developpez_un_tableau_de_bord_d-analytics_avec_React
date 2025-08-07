import PropTypes from 'prop-types';
import styles from './NutritionStatCard.module.scss';

import fire from '../../assets/fire-calori.svg';

const NutritionStatCard = ({ logo, alt,}) => {
    return (
        <div className={styles.cardNutrients}>
			<div className={styles.cardIconWrapper}>
				<img src={fire} alt={alt} className={styles.calorieIcon} />
			</div>
			<div className={styles.cardDataWrapper}>
				<p className={styles.valueNutrient}>1520kg</p>
				<p className={styles.titleNutrient}>Protéines</p>
			</div>
		</div>
    )

}

NutritionStatCard.PropTypes = {

}

export default NutritionStatCard