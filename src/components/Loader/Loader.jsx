import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loaderWrapper}>   
        <div className={styles.progress}>
            <div className={styles.bar}></div>
        </div>
    </div>
  );
}
