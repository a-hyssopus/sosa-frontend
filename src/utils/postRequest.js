export async function postRequest(url = '', data = {}, method = '') { // fits for POST, PUT and PATCH requests
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
    return response.json();
}
