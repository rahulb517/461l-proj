import { useQuery } from 'react-query';

export async function getFetch(path) {
	const fetchResponse = await fetch(`https://warm-scrubland-04074.herokuapp.com/api${path}`);
	return await fetchResponse.json();
}

export async function postFetch(path, requestOptions) {
	const fetchResponse = await fetch(`https://warm-scrubland-04074.herokuapp.com/api${path}`, requestOptions);
	const data = await fetchResponse.json();
	return [fetchResponse, data]
}

export async function putFetch(path, requestOptions) {
	const fetchResponse = await fetch(`https://warm-scrubland-04074.herokuapp.com/api${path}`, requestOptions);
	const data = await fetchResponse.json();
	return [fetchResponse, data]
}
