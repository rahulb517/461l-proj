import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { Alert } from '@mui/material';


function Project() {
	const [joinProjectId, setJoinProjectId] = React.useState('');
	const [createProjectId, setCreateProjectId] = React.useState('');
	const [createProjectName, setCreateProjectName] = React.useState('');
	const [createProjectDescription, setCreateProjectDescription] = React.useState('');
	const [user, dispatch] = React.useContext(AuthContext);
	const [validCreateId, setValidCreateId] = React.useState(null);
	const [validJoinId, setValidJoinId] = React.useState(null);


	async function handleJoinSubmit(e) {
		e.preventDefault();
		let payload = {}
		payload.userId = user.user;
		payload.joinProjectId = joinProjectId;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		};

		console.log(payload);

		try {
			const fetchResponse = await fetch(`http://localhost:8000/api/join_project/`, requestOptions);
			const data = await fetchResponse.json();
			if(!fetchResponse.ok){
				throw data.detail;
			}
			setValidJoinId(true);

		} catch (err) {
			console.log(err);
			setValidJoinId(false);
		}
		
	}

	async function handleCreateSubmit(e) {
		e.preventDefault();
		let payload = {}
		payload.userId = user.user;
		payload.hardware = '';
		payload.createProjectId = createProjectId;
		payload.createProjectName = createProjectName;
		payload.createProjectDescription = createProjectDescription;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		};
		
		console.log(payload);

		try {
			const fetchResponse = await fetch(`http://localhost:8000/api/create_project/`, requestOptions);
			const data = await fetchResponse.json();
			if(!fetchResponse.ok){
				throw data.detail;
			}
			setValidCreateId(true);

		} catch (err) {
			console.log(err);
			setValidCreateId(false);
		}
		
	}

	const renderCreateProjectStatus = () => {
		if (validCreateId === true) {
			return(
				<Grid item xs={12}>
					<Alert severity="success">
						Successfully created project {createProjectId}
					</Alert>
				</Grid>
			)
		}
		else if (validCreateId === false) {
			return(
				<Grid item xs={12}>
					<Alert severity="error">
						Project Id already exists
					</Alert>
				</Grid>
			)
		}
	}

	const renderJoinProjectStatus = () => {
		if (validJoinId === true) {
			return(
				<Grid item xs={12}>
					<Alert severity="success">
						Successfully joined project {joinProjectId}
					</Alert>
				</Grid>
			)
		}

		else if (validJoinId === false) {
			return(
				<Grid item xs={12}>
					<Alert severity="error">
						Project Id does not exist
					</Alert>
				</Grid>
			)
		}
	}


	return (
		<React.Fragment>
			<form className='joinProject' onSubmit={ handleJoinSubmit } >
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h4">
						Join Project
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						label="Project Id"
						onInput ={ e => setJoinProjectId(e.target.value)}
					/>
				</Grid>

				{renderJoinProjectStatus()}

				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Join
					</Button>
				</Grid>

			</Grid>
			</form>

			<form className='createProject' onSubmit={ handleCreateSubmit } >
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h4">
						Create Project
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						label="Project Id"
						onInput ={ e => setCreateProjectId(e.target.value)}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						label="Project Name"
						onInput ={ e => setCreateProjectName(e.target.value)}
					/>
				</Grid>
				

				<Grid item xs={12}>
					<TextField
						required
						label="Project Description"
						multiline
						style = {{width: 35 + '%'}}
						onInput ={ e => setCreateProjectDescription(e.target.value)}
					/>
				</Grid>

				{renderCreateProjectStatus()}

				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
					>
						Create
					</Button>
				</Grid>

			</Grid>
			</form>
		</React.Fragment>

	)
}

export default Project