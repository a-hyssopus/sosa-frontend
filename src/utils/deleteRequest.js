export function deleteRequest(url) {
    const response = fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    return response;
}
