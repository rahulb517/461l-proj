import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';

function Signup() {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	
	async function handleSubmit(e){
		e.preventDefault();
		let myJSON = {}
		myJSON.username = username;
		myJSON.password = password;
		console.log(myJSON);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(myJSON)
		};
		const fetchResponse = await fetch(`https://limitless-dusk-43236.herokuapp.com/api/signup/`, requestOptions);
		const data = await fetchResponse.json();
		if(fetchResponse.ok) {
			loginRedirect();			
		}
		if (data.detail === 'User already exists') {
			alert('User already exists');
		}	
	}

	const history = useHistory();

	const loginRedirect = () => {
		history.push('/login');
	}
	return (
		<form className='login' onSubmit={ handleSubmit } >
			<Grid container justifyContent="center" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h3">
						Create Account
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						id="standard-username-input"
						label="Username"
						onInput ={ e => setUsername(e.target.value)}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						id="standard-password-input"
						label="Password"
						type="password"
						onInput={ e => setPassword(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button type="submit" variant="contained" color="secondary">
						Create Account
					</Button>		
				</Grid>

			</Grid>
		</form>
	)
}
export default Signup;
