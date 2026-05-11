export async function RegFetch(userData) {
    try {
        const response = await fetch('http://localhost:3000/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ошибка при регистрации');
        }

        return data;
    } catch (error) {
        throw error;
    }
}