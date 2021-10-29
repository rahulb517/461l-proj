import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'

function Login() {	
	const [user, dispatch] = React.useContext(AuthContext)
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [verifyPassword, setVerifyPassword] = React.useState(true);
	
	async function handleSubmit(e){
		e.preventDefault();
		let myJSON = {}
		myJSON.username = username;
		myJSON.password = password;
		console.log(myJSON);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: JSON.stringify(
			  `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
			),
		};

		try {
			const fetchResponse = await fetch(`http://localhost:8000/api/login/`, requestOptions);
			const data = await fetchResponse.json();
			if(!fetchResponse.ok){
				throw data.detail;
			}
			setVerifyPassword(true);
			dispatch({
				type: 'LOGIN',
				payload: {
					token: data.access_token,
					userId: username
				}
			});
			loginRedirect();	
			
		} catch (err) {
			console.log(err)
			setVerifyPassword(false);
		}
	}

	const history = useHistory();

	const loginRedirect = () => {
		history.push('/datasets');
	}

	const renderWrongPasswordError = () => {
		if (verifyPassword === false) {
			return(
				<Grid item xs={12}>
					<Alert severity="error">
						Wrong username or password
					</Alert>
				</Grid>
			)
		}
	}

	return (
		<form className='login'onSubmit={ handleSubmit } >
			<Grid container justifyContent="center" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h3">
						Login
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						label="Username"
						onInput ={ e => setUsername(e.target.value)}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						label="Password"
						type="password"
						onInput={ e => setPassword(e.target.value)}
					/>
				</Grid>
				
				{renderWrongPasswordError()}

				<Grid item xs={12}>
					<Button type="submit" variant="contained" color="primary">
						Login
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button component={Link} to="/signup" variant="contained" color="secondary">
						Make an Account
					</Button>		
				</Grid>

			</Grid>
		</form>
	)
}
export default Login;