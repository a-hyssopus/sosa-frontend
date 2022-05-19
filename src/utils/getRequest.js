export async function getRequest(url) {
    const response = await fetch(url)
        .then(res => res.json())
    return response;
}
