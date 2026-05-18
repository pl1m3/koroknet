export async function GetAllApplicationsFetch() {
    const response = await fetch('http://localhost:3000/getAllApplications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });

        const data = await response.json()

        return data
}