export async function GetApplicationsFetch(user_id) {
    const response = await fetch('http://localhost:3000/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user_id})
        });

        const data = await response.json()

        return data
}