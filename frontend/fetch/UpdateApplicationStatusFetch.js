export async function UpdateApplicationStatusFetch(application_id, newStatus) {
    try {
        const response = await fetch('http://localhost:3000/updateApplicationStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                application_id,
                status: newStatus
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success === false) {
            throw new Error(data.message || "Ошибка при обновлении");
        }
        
        return data;

    } catch (error) {
        console.error("Ошибка обновления статуса:", error);
        throw error;
    }
}