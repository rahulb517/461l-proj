import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Todos from "./Todos";

function Resources() {

	const [checkIn, setCheckout] = React.useState('');
	
	async function handleSubmit(e){
		e.preventDefault();
		let myJSON = {}
		myJSON.amount = checkIn;
		console.log(myJSON);

		const requestOptions = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(myJSON)
		};
		const fetchResponse = await fetch(`http://localhost:8000/api/resources/`, requestOptions);
		const data = await fetchResponse.json();
		if(fetchResponse.ok){
			refresh();
		}
		if(data.detail === 'Cannot checkout this many resources'){
			alert('Cannot checkout this many resources');
		}
	}

		const history = useHistory();

		const refresh = () => {
			history.pushState('/resources');
		}
    return(
        <body>
        <div className='internalPage'>
            <h1>Resources</h1>
        </div>
        <h2> Set1
			{/* <Todos /> */}
			<form onSubmit = {handleSubmit}>
				<TextField
					id="standard-basic"
					label="Check Out Amount"
					onInput = { e => setCheckout(e.target.value)}
					/>
				<Button type="submit" varaint="contained">
					Submit
				</Button>
			</form>
		</h2>
        </body>
    )
}

export default Resources