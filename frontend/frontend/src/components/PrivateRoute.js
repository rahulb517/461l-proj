import React from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../AuthContext'

function PrivateRoute({children, ...rest}){
    const [user, dispatch] = React.useContext(AuthContext)
    return(
        <Route
            {...rest}
            render={({location}) => user.isAuth ? 
                (children) : (<Redirect to={ {pathname: "/login", state: {from: location}} }/>)}
        />
    );
} export default PrivateRoute