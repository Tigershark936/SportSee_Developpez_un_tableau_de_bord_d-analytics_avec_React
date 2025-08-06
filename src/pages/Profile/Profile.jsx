import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Profile = () => {
    // Me permet de récuperer le paramètre userId
    const { userId } = useParams()
    console.log(userId);

    const {data, error} = useFetch(
        `http://localhost:3000/user/${userId}`
    );
    console.log('data', data);
    
    if (error) {
        return < NotFound />
    }
    
    
}

export default Profile