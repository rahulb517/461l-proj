import React from 'react';
import { useHistory } from 'react-router-dom';
import {Alert, Button, Grid, Input, TextField, Typography } from '@mui/material';
import ResourceInfo from './ResourceInfo';
import { QueryClient, QueryClientProvider } from 'react-query';
import Select from 'react-select';
import { AuthContext } from '../AuthContext';



const queryClient = new QueryClient()
function Resources() {
	const [user, dispatch] = React.useContext(AuthContext);
	const [quantity, setQuantity] = React.useState('');
	const [projectList, setProjectList] = React.useState([]);
	const [resourceList, setResourceList] = React.useState([]);
	const [projectSelected, setProjectSelected] = React.useState('');
	const [resourceSelected, setResourceSelected] = React.useState('');
	const [validTransaction, setValidTransaction] = React.useState('');
	const [actionType, setActionType] = React.useState('');
	const [errorMessage, setErrorMessage] = React.useState('');
	const [successMessage, setSuccessMessage] = React.useState('');

	const projectOptions = [];
	for (const project of projectList) {
		projectOptions.push({value: project, label: project})
	}
	const resourceOptions = [];
	for (const resource of resourceList) {
		resourceOptions.push({value: resource, label: resource})
	}

	React.useEffect(() => {
		async function fetchData() {
			let userId = user.user.replace(/["]+/g, '')
			const projFetchResponse = await fetch(`/api/projects/${userId}`);
			const resourceFetchResponse = await fetch('/api/resources');
			const projData = await projFetchResponse.json();
			const resourceData = await resourceFetchResponse.json();
			setResourceList(Object.keys(resourceData));
			console.log(Object.keys(resourceData))
			setProjectList(projData['projects']);
		}
		fetchData();
	}, []);
	
	async function handleSubmit(e){
		e.preventDefault();
	
		if (actionType === 'checkout') {
			try {
				let projCheckoutPayload = {}
				projCheckoutPayload.project_id = projectSelected;
				projCheckoutPayload.type = actionType;
				projCheckoutPayload.hardware = {[resourceSelected]: quantity};

				const requestOptions = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(projCheckoutPayload)
				};

				const fetchResponse = await fetch(`/api/projects`, requestOptions);
				const data = await fetchResponse.json();
				if(!fetchResponse.ok){
					throw data.detail;
				}
				if(data.message === "Full request successful") {
					setValidTransaction('Complete checkout');
					setSuccessMessage(data.message);
				}
				else if(data.message === "Partial request successful") {
					setValidTransaction('Incomplete checkout');
					setSuccessMessage(data.message);
				}
				
			} catch(err) {
				console.log(err);
				setValidTransaction('Invalid checkout');
				setErrorMessage(err);
				console.log(errorMessage);
			}
		}

		else if (actionType === 'checkin') {
			try {
				let projCheckinPayload = {}
				projCheckinPayload.project_id = projectSelected;
				projCheckinPayload.type = actionType;
				projCheckinPayload.hardware = {[resourceSelected]: quantity};

				const checkinRequestOptions = {
					method: 'PUT',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(projCheckinPayload)
				}
				const fetchResponse = await fetch('/api/projects', checkinRequestOptions)
				const data = await fetchResponse.json()
				if(!fetchResponse.ok){
					throw data.detail;
				}
				setValidTransaction('Valid checkin');

			} catch(err) {
				console.log(err);
				setValidTransaction('Invalid checkin');
				setErrorMessage(err);
				console.log(errorMessage);
			}
		}
		
	}

	const renderTransactionStatus = () => {
		if (validTransaction === 'Complete checkout' || validTransaction === 'Incomplete checkout') {
			return(
				<Grid item xs={12}>
					<Alert severity="success">
						{successMessage}
					</Alert>
				</Grid>
			)
		}

		if (validTransaction === 'Valid checkin') {
			return(
				<Grid item xs={12}>
					<Alert severity="success">
						Successfully fulfilled request
					</Alert>
				</Grid>
			)
		}

		if (validTransaction === 'Incomplete checkout') {
			return(
				<Grid item xs={12}>
					<Alert severity="success">
						This request may not have been completely fulfilled
					</Alert>
				</Grid>
			)
		}

		else if (validTransaction === 'Invalid checkout') {
			return(
				<Grid item xs={12}>
					<Alert severity="error">
						{errorMessage}
					</Alert>
				</Grid>
			)
		}

		else if (validTransaction === 'Invalid checkin') {
			return(
				<Grid item xs={12}>
					<Alert severity="error">
						{errorMessage}
					</Alert>
				</Grid>
			)
		}
	}
    return(
        <React.Fragment>
			<div className='infoCard'>
				<QueryClientProvider client={queryClient}>
					<ResourceInfo />
				</QueryClientProvider>
			</div>
			
			<form className='resourceForm' onSubmit={ handleSubmit } >
				<Grid container justifyContent="center" spacing={4}>
					<Grid item xs={12}>
						<Typography variant="h3">
							Resource Manager
						</Typography>
					</Grid>
					
					<Grid item xs={12}>
						<Select
							options={projectOptions}
							onChange=
							{e => {setProjectSelected(e.value)}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Select
							options={resourceOptions}
							onChange=
							{e => {setResourceSelected(e.value)}}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							type="number"
							label="Quantity"
							onChange ={ e => setQuantity(parseInt(e.target.value))}
						/>
					</Grid>

					{renderTransactionStatus()}

					<Grid item xs={6}>
						<Button type="submit"
							variant="contained"
							color="primary"
							onClick={() => setActionType('checkin')}>
								Check In
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button type="submit"
							variant="contained"
							color="primary"
							onClick={() => setActionType('checkout')}>
								Checkout
						</Button>
					</Grid>
				</Grid>
			</form>
		</React.Fragment>
    )
}

export default Resources