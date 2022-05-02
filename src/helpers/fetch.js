const baseUrl = process.env.REACT_APP_API_URL;


//fetchWithoutToken

const fetchWithoutToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`; // localhost:4000/api/

    if (method === 'GET') {

        return fetch(url);

    } else {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }
}


//fetchWithToken

const fetchWithToken = (endpoint, data, method = 'GET') => {


    const url = `${baseUrl}/${endpoint}`; // localhost:4000/api/

    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {

        return fetch(url, {
            method,
            headers: {
                'x-token': token,
            }
        });

    } else {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify(data),
        })
    }
}



export { fetchWithoutToken, fetchWithToken };