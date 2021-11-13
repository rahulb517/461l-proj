import { useQuery } from 'react-query';
import { Button, Grid, Paper } from '@mui/material';

const fetchDatasets = async () => {
	const fetchResponse = await fetch(`https://warm-scrubland-04074.herokuapp.com/api/datasets`);
	return await fetchResponse.json();
}

function DatasetInfo5() {
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
                    <p> <b>Abstract: </b>{data.Heart.abstract}</p>
                    <p> <b>Background: </b>{data.Heart.background}</p>
                    <Button href= {data.Heart.url}>Download</Button>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    )
)
}
export default DatasetInfo5;