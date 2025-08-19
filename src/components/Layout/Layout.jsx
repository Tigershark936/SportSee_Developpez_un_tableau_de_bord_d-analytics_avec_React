import { Outlet } from "react-router-dom"
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from './Layout.module.scss';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.mainContainer}>
                <Sidebar />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout