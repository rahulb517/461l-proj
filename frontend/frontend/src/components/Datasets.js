import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material';
import { IoIosArrowDropdown } from 'react-icons/io';
import { AuthContext } from '../AuthContext'
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import DatasetInfo1 from './DatasetInfo1'
import DatasetInfo2 from './DatasetInfo2'
import DatasetInfo3 from './DatasetInfo3'
import DatasetInfo4 from './DatasetInfo4'
import DatasetInfo5 from './DatasetInfo5'


const queryClient = new QueryClient()
function Datasets() {

	const [user, dispatch] = React.useContext(AuthContext)
	console.log(user);

	return (
		<div className='datasets'>
			<h1>Datasets</h1>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					<b>
						Labeled raw accelerometry data captured during walking, stair climbing and driving
					</b>
				</AccordionSummary>
				<AccordionDetails>
					<QueryClientProvider client={queryClient}>
						<DatasetInfo1/>
					</QueryClientProvider>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					<b>
						Pulse Amplitudes from electrodermal activity collected from healthy volunteer subjects at rest and under controlled sedation
					</b>
				</AccordionSummary>
				<AccordionDetails>
				<QueryClientProvider client={queryClient}>
					<DatasetInfo2/>
				</QueryClientProvider>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					<b>
						MIMIC-IV demo data in the OMOP Common Data Model
					</b>
				</AccordionSummary>
				<AccordionDetails>
				<QueryClientProvider client={queryClient}>
					<DatasetInfo3/>
				</QueryClientProvider>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					<b>
						Q-Pain: A Question Answering Dataset to Measure Social Bias in Pain Management
					</b>
				</AccordionSummary>
				<AccordionDetails>
				<QueryClientProvider client={queryClient}>
					<DatasetInfo4/>
				</QueryClientProvider>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<IoIosArrowDropdown />}>
					<b>
						Heart Vector Origin Point Detection and Time-Coherent Median Beat Construction
					</b>
				</AccordionSummary>
				<AccordionDetails>
				<QueryClientProvider client={queryClient}>
					<DatasetInfo5/>
				</QueryClientProvider>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}
export default Datasets;
