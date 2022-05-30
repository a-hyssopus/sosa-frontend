export async function deleteRequest(url, data = {}) {
    const response = await fetch(url, {
        method: 'DELETE',
        'credentials': 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })
    return response;
}
