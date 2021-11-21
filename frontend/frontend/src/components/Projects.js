import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { Alert } from '@mui/material';
import ProjectInfo from './ProjectInfo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { postFetch, putFetch } from '../utils/utils';

const queryClient = new QueryClient()

function Project() {
	const [joinProjectId, setJoinProjectId] = React.useState('');
	const [createProjectId, setCreateProjectId] = React.useState('');
	const [createProjectName, setCreateProjectName] = React.useState('');
	const [createProjectDescription, setCreateProjectDescription] = React.useState('');
	const [user, dispatch] = React.useContext(AuthContext);
	const [validCreateId, setValidCreateId] = React.useState(null);
	const [validJoinId, setValidJoinId] = React.useState(null);
	const [errorMessage, setErrorMessage] = React.useState('');


	async function handleJoinSubmit(e) {
		e.preventDefault();
		let payload = {}
		payload.members = [user.user.replace(/["]+/g, '')];
		payload.project_id = joinProjectId;
		payload.hardware = {};
		

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		};

		console.log(payload);

		try {
			const [fetchResponse, data] = await putFetch('/projects', requestOptions);
			if(!fetchResponse.ok){
				throw data.detail;
			}
			setValidJoinId(true);

		} catch (err) {
			console.log(err);
			setValidJoinId(false);
			setErrorMessage(err);
		}
		
	}

	async function handleCreateSubmit(e) {
		e.preventDefault();
		let payload = {}
		payload.name = createProjectName;
		payload.description = createProjectDescription;
		payload.project_id = createProjectId;
		payload.members = [user.user.replace(/["]+/g, '')];
		payload.hardware = {};
		

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		};
		
		console.log(payload);

		try {
			const [fetchResponse, data] = await postFetch('/projects', requestOptions);
			if(!fetchResponse.ok){
				throw data.detail;
			}
			setValidCreateId(true);

		} catch (err) {
			console.log(err);
			setValidCreateId(false);
			setErrorMessage(err);
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
						{errorMessage}
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
						{errorMessage}
					</Alert>
				</Grid>
			)
		}
	}


	return (
		<React.Fragment>
			<div className='infoCard'>
				<QueryClientProvider client={queryClient}>
						<ProjectInfo />
				</QueryClientProvider>
			</div>

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