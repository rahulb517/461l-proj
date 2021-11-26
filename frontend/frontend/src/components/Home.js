import React from 'react';
import { AuthContext } from '../AuthContext';
import { Stack, Fab} from '@mui/material';
import { useHistory } from 'react-router-dom';
import '../styles/Home.css';
import { red } from '@mui/material/colors';



function Home() {
	const history = useHistory();

	function handleLoginClick(){
		history.push('/login')
	}

	function handleSignupClick(){
		history.push('/signup')
	}

	return (
		<div className='Home'>
			<div className='homebar'>
				<Stack direction="row" spacing={4}>
					<Fab 
					  className="item" 
					  variant="extended" 
					  sx={{
						  bgcolor: '#CC5500',
						  '&:hover':{
							bgcolor: '#F79B59',
						  }
						}}
					  color="inherit"
					  onClick={handleLoginClick}>
        				Login
      				</Fab>
					  <Fab 
					  className="item" 
					  variant="extended" 
					  sx={{
						  bgcolor: '#CC5500',
						  '&:hover':{
							bgcolor: '#F79B59',
						  }
						}}
					  color="inherit"
					  onClick={handleSignupClick}>
        				Signup
      				</Fab>
				</Stack>
			</div>
			<div className='Info'>
				<h1>Welcome to Daintree</h1>
			</div>
		</div>
	)
}
export default Home;