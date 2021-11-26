import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../AuthContext'

function PrivateRoute({children, ...rest}){
    const [user, dispatch] = React.useContext(AuthContext)
	// if a user is not authenticated and tries to access a private route, it will redirect them to the login page
    return(
        <Route
            {...rest}
            render={({location}) => user.isAuth ? 
                (children) : (<Redirect to={ {pathname: "/login", state: {from: location}} }/>)}
        />
    );
} export default PrivateRoute