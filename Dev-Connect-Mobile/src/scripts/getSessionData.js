export default async function sessionData() {

    try {
        const data = await fetch('https://api.quintondev.com/connect/sessionData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })

        console.log('SESSION API STATUS:', data.status, data.statusText)

        const result = await data.json()

        console.log('SESSION API RESULT:', result)
        console.log('SESSION API RESULT TYPE:', typeof result)
        console.log('SESSION API DATA:', result?.data)
        console.log('SESSION API DATA IS ARRAY:', Array.isArray(result?.data))

        if (!result) {
            return {error: 'Failed to fetch API data'}
        } else if (result.error) {
            return {error: result.error}
        } else if (!Array.isArray(result.data)) {
            return {
                error: `Invalid session data received. Expected an array in result.data but received: ${JSON.stringify(result)}`
            }
        } else {
            return {data: result.data}
        }

    } catch (error) {
        console.error('SESSION API ERROR:', error)

        return {
            error: error instanceof Error ? error.message : String(error)
        }
    }

}