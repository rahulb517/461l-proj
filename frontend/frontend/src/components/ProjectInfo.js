import React from 'react';
import { useQuery } from 'react-query'
import { Alert, Grid, Paper } from '@mui/material';
import { AuthContext } from '../AuthContext';

function ProjectInfo() {
	const [user, dispatch] = React.useContext(AuthContext);
	const {data, status} = useQuery('projects', async () => {
		let userId = user.user.replace(/["]+/g, '')
		const fetchResponse = await fetch(`https://limitless-dusk-43236.herokuapp.com/api/projects/${userId}`);
		return await fetchResponse.json();
	}, {
		staleTime: 1000,
		//placeholderData: { HWSet1: "{\"_id\": {\"$oid\": \"617ba4a3885d8944d1b2961a\"}, \"name\": \"HWSet1\", \"capacity\": 200, \"availability\": 200}", HWSet2: "{\"_id\": {\"$oid\": \"617ba4e26c2b00b199b0b081\"}, \"name\": \"HWSet2\", \"capacity\": 200, \"availability\": 200}" },
	});
	console.log(data)

	function renderProjectList() {
		let projects = []
		for (const project of data['projects']){
			projects.push(<p key={project}>{project}</p>);
		}
		return projects;
	}

	return (
		<>
			{status === 'success' && (
				<>
					<Grid item xs={4}>
						<Paper >
							<Grid justifyContent="center" alignItems="center" container spacing={4}>
								<Grid item xs={12}>
									<h3>My Projects:</h3>
									{renderProjectList()}
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</>
			)}
			{status === 'error' && (
				<Grid item xs={12}>
					<Alert severity="error">
						Cannot retrieve data
					</Alert>
				</Grid>
			)}
		</>	
	)
}

export default ProjectInfo;