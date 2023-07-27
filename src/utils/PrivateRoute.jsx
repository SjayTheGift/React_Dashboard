import { Navigate  } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { history } from './_Helpers';

const PrivateRoute = ({ children }) => {
    const { userToken } = useSelector((state) => state.auth)

    if(!userToken){
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" state={{ from: history.location }} replace/>
    }
    return children;
}

export { PrivateRoute };