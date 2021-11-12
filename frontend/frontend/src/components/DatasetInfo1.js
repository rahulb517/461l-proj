import { useQuery } from 'react-query';
import { Grid, Paper } from '@mui/material';

const fetchDatasets = async () => {
	const fetchResponse = await fetch(`http://localhost:8000/api/datasets`);
	return await fetchResponse.json();
}

function DatasetInfo1() {
		const {data, status} = useQuery('datasets', fetchDatasets, {
			staleTime: 2000,
		});
		console.log(data);

    return(
        status === 'success' && (
            <Grid item xs={6}>
            <Paper >
                <Grid justifyContent="center" alignItems="center" container spacing={4}>
                    <Grid item xs={12}>
                        Abstract: {JSON.parse(data['accelerometry'])['abstract']}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        )
    )
}
export default DatasetInfo1;