import styles from './UserGreeting.module.scss';

const UserGreeting = ({ firstname, }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Bonjour <span className={styles.firstName}>{firstname}</span></h1>
            <p className={styles.p}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    )
}

export default UserGreeting