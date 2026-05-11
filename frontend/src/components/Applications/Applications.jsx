import { useState, useEffect } from "react";
import { GetApplicationsFetch } from "../../../fetch/GetApplicationsFetch";
function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadApplications = async () => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user?.id) {
                throw new Error("Пользователь не авторизован");
            }

            const data = await GetApplicationsFetch(user.id);
            setApplications(data);
            setLoading(false);
        };

        loadApplications();
    }, []);

    if (loading) return <div>Загрузка заявок...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div>
            <h2>Ваши заявки</h2>

            <ul>
                {applications.map((app) => (
                    <li key={app.id}>
                        <h3>{app.course_name}</h3>
                        <p><strong>Желаемая дата:</strong>{app.desired_start_date}</p>
                        <p><strong>Оплата:</strong> {app.payment_method}</p>
                        <p><strong>Статус:</strong>
                            <span className={`status status-${app.status}`}>
                                {app.status}
                            </span>
                        </p>
                        <small>Создано: {new Date(app.created_at).toLocaleDateString('ru-RU')}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Applications