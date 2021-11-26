const url = 'https://warm-scrubland-04074.herokuapp.com/api'

// here we have abstracted away the fetch syntax in order to have cleaner code
// this is also beneficial because now we only have to change one base url in order to change from localhost to our production server
export async function getFetch(path) {
	const fetchResponse = await fetch(`${url}${path}`);
	return await fetchResponse.json();
}

export async function postFetch(path, requestOptions) {
	const fetchResponse = await fetch(`${url}${path}`, requestOptions);
	const data = await fetchResponse.json();
	return [fetchResponse, data]
}

export async function putFetch(path, requestOptions) {
	const fetchResponse = await fetch(`${url}${path}`, requestOptions);
	const data = await fetchResponse.json();
	return [fetchResponse, data]
}

export async function deleteFetch(path, requestOptions) {
	const fetchResponse = await fetch(`${url}${path}`, requestOptions);
	const data = await fetchResponse.json();
	return [fetchResponse, data]
}
