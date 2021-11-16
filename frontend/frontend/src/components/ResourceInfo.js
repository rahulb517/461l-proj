import { useQuery } from 'react-query'
import { Alert, Grid, Paper } from '@mui/material';


const fetchHardwareData = async () => {
	const fetchResponse = await fetch(`https://warm-scrubland-04074.herokuapp.com/api/resources`);
	return await fetchResponse.json();
}

function ResourceInfo() {
	const {data, status} = useQuery('hardware', fetchHardwareData, {
		staleTime: 2000,
		//placeholderData: { HWSet1: "{\"_id\": {\"$oid\": \"617ba4a3885d8944d1b2961a\"}, \"name\": \"HWSet1\", \"capacity\": 200, \"availability\": 200}", HWSet2: "{\"_id\": {\"$oid\": \"617ba4e26c2b00b199b0b081\"}, \"name\": \"HWSet2\", \"capacity\": 200, \"availability\": 200}" },
	});
	console.log(data)

	return (
		<>
			{status === 'success' && (
				<>
					<Grid item xs={6}>
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

export default ResourceInfo;