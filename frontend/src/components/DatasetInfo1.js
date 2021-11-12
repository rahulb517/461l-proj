import { useQuery } from 'react-query';
import { Button, Grid, Paper } from '@mui/material';

const fetchDatasets = async () => {
	const fetchResponse = await fetch(`https://dreamteam461l.com/api/datasets`);
	return await fetchResponse.json();
}

function DatasetInfo1() {
		const {data, status} = useQuery('datasets', fetchDatasets, {
			staleTime: 2000,
		});
		console.log(data);

    return(
        status === 'success' && (
            <Grid item xs={12}>
            <Paper >
                <Grid justifyContent="center" alignItems="center" container spacing={4}>
                    <Grid item xs={12}>
                        <p>Abstract: {data.accelerometry.abstract}</p>
                        <p>Background: {data.accelerometry.background}</p>
                        <Button href= {data.accelerometry.url}>Download</Button>

                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        )
    )
}
export default DatasetInfo1;






