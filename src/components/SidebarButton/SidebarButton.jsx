import styles from './SidebarButton.module.scss';

const SidebarButton = ({ logo, alt }) => {
    return (
		<button className={styles.button}>
			<img src={logo} alt={alt} className="sidebarbutton-logo" />
		</button>
	)
}

export default SidebarButton