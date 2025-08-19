import styles from './Sidebar.module.scss';
import SidebarButton from '../SidebarButton/SidebarButton';

import yoga from '../../assets/yoga.png';
import swim from '../../assets/swimming.png';
import bike from '../../assets/cyclist.png';
import dumbbell from '../../assets/bodybuilding.png';

const Sidebar = () => {
    return (
        <aside className={styles.aside}>
            <div className={styles.sidebarbutton}>
				<SidebarButton logo={yoga} alt="Yoga icon" className={styles.buttonlogo}/>
				<SidebarButton logo={swim} alt="Swimming icon" className={styles.buttonlogo} />
				<SidebarButton logo={bike} alt="Cycling icon" className={styles.buttonlogo} />
				<SidebarButton logo={dumbbell} alt="Dumbbell icon" className={styles.buttonlogo} />
			</div>
            <p className={styles.copyright}>Copiryght, SportSee 2020</p>
        </aside>
    )
}

export default Sidebar