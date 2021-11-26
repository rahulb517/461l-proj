import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext'

function Logout(){
    const [user, dispatch] = React.useContext(AuthContext);
    // this clears the JWT token, so a user will have to re-authenticate to access protected pages
    useEffect(() => {    
        dispatch({
            type: 'LOGOUT',
            payload: {
                token: '',
                userId: ''
            }
        });
    });

    return(
        <div className = 'Logout'>
		    <p>Logging you out...</p>
        </div>
    );
}
export default Logout;