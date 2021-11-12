import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { IoIosArrowDropdown } from 'react-icons/io';
import { AuthContext } from '../AuthContext'
import React from 'react';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import DatasetInfo1 from './DatasetInfo1'


const queryClient = new QueryClient()
function Datasets() {

	const [user, dispatch] = React.useContext(AuthContext)
	console.log(user);

	return (
		<div className='datasets'>
			<h1>{user.user}</h1>
			<QueryClientProvider client={queryClient}>
							<DatasetInfo1/>
						</QueryClientProvider>
			<Accordion>
					<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
						Labeled raw accelerometry data captured during walking, stair climbing and driving https://physionet.org/content/accelerometry-walk-climb-drive/1.0.0/
					</AccordionSummary>
					<AccordionDetails>
						{/* Download button */}
						{/* <QueryClientProvider client={queryClient}>
							<DatasetInfo1/>
						</QueryClientProvider> */}
					</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					Pulse Amplitudes from electrodermal activity collected from healthy volunteer subjects at rest and under controlled sedation https://physionet.org/content/eda-rest-sedation/1.0/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					MIMIC-IV demo data in the OMOP Common Data Model https://physionet.org/content/mimic-iv-demo-omop/0.9/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					Q-Pain: A Question Answering Dataset to Measure Social Bias in Pain Management https://physionet.org/content/q-pain/1.0.0/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					Heart Vector Origin Point Detection and Time-Coherent Median Beat Construction https://physionet.org/content/heart-vector-origin-matlab/1.0.0/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
		</div>
	)
}
export default Datasets;
