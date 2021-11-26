import React from 'react';
import { useQuery } from 'react-query'
import { Alert, Grid, Paper } from '@mui/material';
import { AuthContext } from '../AuthContext';
import { getFetch } from '../utils/utils';


function ProjectInfo() {
	const [user, dispatch] = React.useContext(AuthContext);
	const fetchProjectData = async () => {
		let userId = user.user.replace(/["]+/g, '');
		const projectData = await getFetch(`/projects/${userId}`);
		return projectData;
	}

	const {data, status} = useQuery('projects', fetchProjectData, {
		staleTime: 1000,
	});
	console.log(data)

	function renderProjectList() {
		// this renders the list of projects by iterating through the JSON array
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