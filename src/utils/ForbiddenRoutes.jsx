import { Navigate  } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { history } from './_Helpers';
import { decodeToken  } from "react-jwt";

const convertTextToBoolean = (val) =>{
    if(val.toLowerCase()  === 'true'){
        return true
    }
    return false
}

const ForbiddenRoutes = ({ children }) => {
    const { userToken } = useSelector((state) => state.auth)

    if(userToken){
        const user = JSON.parse(userToken)
        const is_hr = convertTextToBoolean(decodeToken(user.access)['is_hr'])
        if(is_hr){
            return children;
        }
        return <Navigate to="/forbidden" state={{ from: history.location }}/>
    }
}

export { ForbiddenRoutes };