import { useQuery } from 'react-query';
import { Button, Grid, Paper } from '@mui/material';

const fetchDatasets = async () => {
	const fetchResponse = await fetch(`/api/datasets`);
	return await fetchResponse.json();
}

function DatasetInfo3() {
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
                    <p> <b>Abstract: </b>{data.MIMIC.abstract}</p>
                    <p> <b>Background: </b>{data.MIMIC.background}</p>
                    <Button href= {data.MIMIC.url}>Download</Button>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    )
)
}
export default DatasetInfo3;