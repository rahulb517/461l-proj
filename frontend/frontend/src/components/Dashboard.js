import ResourceInfo from "./ResourceInfo";
import ProjectInfo from "./ProjectInfo";
import ProjectDetail from "./ProjectDetail"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Grid } from '@mui/material';

const queryClient = new QueryClient()

function Dashboard() {
	return(
		<div className='internalPage'>
			<Grid justifyContent="center" alignItems="center" container spacing={8}>
				<Grid item xs={12}>
					<h1>Dashboard</h1>
				</Grid>
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