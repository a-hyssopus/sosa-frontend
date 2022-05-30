export async function getRequest(url) {
    return await fetch(url)
        .then(res => res.json());
}
