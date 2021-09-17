import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
function Datasets() {
	return (
		<div>
			<Accordion>
					<AccordionSummary expandIcon={<ArrowDropDownCircleIcon />}>
						Labeled raw accelerometry data captured during walking, stair climbing and driving https://physionet.org/content/accelerometry-walk-climb-drive/1.0.0/
					</AccordionSummary>
					<AccordionDetails>
						{/* Download button */}
						Webscrape abstract and background
					</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDropDownCircleIcon />}>
					Pulse Amplitudes from electrodermal activity collected from healthy volunteer subjects at rest and under controlled sedation https://physionet.org/content/eda-rest-sedation/1.0/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDropDownCircleIcon />}>
					MIMIC-IV demo data in the OMOP Common Data Model https://physionet.org/content/mimic-iv-demo-omop/0.9/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDropDownCircleIcon />}>
					Q-Pain: A Question Answering Dataset to Measure Social Bias in Pain Management https://physionet.org/content/q-pain/1.0.0/
				</AccordionSummary>
				<AccordionDetails>
					Webscrape abstract and background
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDropDownCircleIcon />}>
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
