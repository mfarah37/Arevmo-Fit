// This is the base path of the Express route we'll define
import { getToken } from "./users-service";
const BASE_URL = 'api/users';

export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}
// rwgargwgrwg
export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

// export function addSet(setData) {
//     return sendRequest(`${BASE_URL}/set`, 'POST', setData);
// }

export function getUser(userId) {
    return sendRequest(`${BASE_URL}/${userId}`)
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

export function updateUser (userData) {
    return sendRequest(`${BASE_URL}/update`, 'PUT', userData)
}

/*--- Helper Functions ---*/
async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd arg
    // Used to include a data payload, set headers, etc.
    const options = { method }
    if (payload) {
        options.headers = { 'Content-type': 'application/json' }
        options.body = JSON.stringify(payload)
    }
    const token = getToken();
    if (token) {
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options)
    // res.ok will be false if the status code 
    // is set to 4xx in controller action
    if (res.ok) return res.json()
    throw new Error('Bad Request')
}