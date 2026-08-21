export default async function sessionData() {

    const data = await fetch('https://api.quintondev.com/connect/sessionData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })

    const result = await data.json().error

    if (!result) {
        return {error: 'Failed to fetch API data'}
    } else if (result.error) {
        return {error: result.error}
    } else {
        return {data: result.data}
    }

}