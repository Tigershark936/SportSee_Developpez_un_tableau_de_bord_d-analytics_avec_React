// import styles from './Home.module.scss';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';

const Home = ({ id }) => {
    // Ici tu appelles ton hook avec une URL pour tester
    useFetch(`http://localhost:3000/user/${id}`);

    < Header />
}

export default Home