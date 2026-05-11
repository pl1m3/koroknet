export async function AutFetch({login, password}) {
    try {
        const response = await fetch('http://localhost:3000/aut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ошибка при авторизации');
        }

        return data;
    } catch (error) {
        throw error;
    }
}