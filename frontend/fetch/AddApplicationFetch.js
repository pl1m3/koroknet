export async function AddApplicationFetch(newApplication) {

        const response = await fetch('http://localhost:3000/addApplication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newApplication)
        });

        const data = await response.json();

        return data;
}