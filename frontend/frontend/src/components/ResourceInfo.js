import { useQuery } from 'react-query'
import { Alert, Grid, Paper } from '@mui/material';
import { getFetch } from '../utils/utils';


const fetchHardwareData = async () => {
	const hardwareData = await getFetch('/resources');
	return hardwareData;
}

function ResourceInfo() {
	const {data, status} = useQuery('hardware', fetchHardwareData, {
		staleTime: 2000,
	});
	console.log(data)

	function renderHardwareData() {
		let hardwareSets = [];
		for(let key of Object.keys(data)) {	
			hardwareSets.push(
				<Grid key={key} item xs={6}>
					<Paper >
						<Grid justifyContent="center" alignItems="center" container spacing={4}>
							<Grid item xs={12}>
								<h3>{JSON.parse(data[key])['name']}</h3>
								<p>Capactity: {JSON.parse(data[key])['capacity']}</p>
								<p>Availability: {JSON.parse(data[key])['availability']}</p>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			);
		}
		return hardwareSets;
	}

	return (
		<>
			{status === 'success' && (
				<>
					{renderHardwareData()}
					{/* <Grid item xs={6}>
						<Paper >
							<Grid justifyContent="center" alignItems="center" container spacing={4}>
								<Grid item xs={12}>
									<h3>{JSON.parse(data['HWSet1'])['name']}</h3>
									<p>Capactity: {JSON.parse(data['HWSet1'])['capacity']}</p>
									<p>Availability: {JSON.parse(data['HWSet1'])['availability']}</p>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper >
							<Grid justifyContent="center" alignItems="center" container spacing={4}>
								<Grid item xs={12}>
									<h3>{JSON.parse(data['HWSet2'])['name']}</h3>
									<p>Capactity: {JSON.parse(data['HWSet2'])['capacity']}</p>
									<p>Availability: {JSON.parse(data['HWSet2'])['availability']}</p>
								</Grid>
							</Grid>
						</Paper>
					</Grid> */}
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

export default ResourceInfo;