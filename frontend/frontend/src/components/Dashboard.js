import ResourceInfo from "./ResourceInfo";
import ProjectInfo from "./ProjectInfo";
import ProjectDetail from "./ProjectDetail"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Grid } from '@mui/material';
import { AuthContext } from '../AuthContext';
import React from 'react';

const queryClient = new QueryClient()

function Dashboard() {
	const [user, dispatch] = React.useContext(AuthContext);
	return(
		// the dashboard is a central hub for all the information on hardware sets and projects the user is part of
		<div className='internalPage'>
			<Grid justifyContent="center" alignItems="center" container spacing={8}>
				<Grid item xs={12}>
					<h1>Dashboard</h1>
				</Grid>
				<Grid item xs={12}>
					<h3>Welcome, {user.user.replace(/["]+/g, '')}</h3>
				</Grid>
				{/* using react query to handle fetching because of its caching and auto-fetch capabilities */}
				<QueryClientProvider client={queryClient}>
					<ResourceInfo />
					<ProjectDetail />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</Grid>
		</div>
	)
}

export default Dashboard