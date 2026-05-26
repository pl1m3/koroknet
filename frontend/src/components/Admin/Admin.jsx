import { useEffect, useState } from "react"
import { GetAllApplicationsFetch } from "../../../fetch/GetAllApplicationsFetch"
import { UpdateApplicationStatusFetch } from "../../../fetch/UpdateApplicationStatusFetch"

function Admin() {

    const [applications, setApplications] = useState([])
    const [updatingId, setUpdatingId] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadApplications = async () => {
            const data = await GetAllApplicationsFetch()
            setApplications(data)
        }
        loadApplications()
    }, [])

    const handleStatusChange = async (applicationId, newStatus) => {
        setUpdatingId(applicationId);
        setError("");

        try {
            await UpdateApplicationStatusFetch(applicationId, newStatus);

            const newApplications = [...applications];

            for (let i = 0; i < newApplications.length; i++) {
                if (newApplications[i].id === applicationId) {
                    newApplications[i].status = newStatus;
                    break;
                }
            }
            setApplications(newApplications);
        } catch (err) {
            setError(err.message);
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <div>
            <h2>Все заявки пользователей</h2>
            <ul>
                {applications.map((el) => (
                    <li key={el.id}>
                        <h3>{el.course_name}</h3>
                        <p>
                            <strong>Пользователь:</strong>{' '}
                            {el.full_name}
                        </p>

                        <p><strong>Желаемая дата:</strong> {el.desired_start_date}</p>
                        <p><strong>Оплата:</strong> {el.payment_method}</p>

                        <p>
                            <strong>Статус:</strong>{' '}
                            <select
                                value={el.status}
                                onChange={(e) => handleStatusChange(el.id, e.target.value)}
                                disabled={updatingId === el.id}
                            >
                                <option value="новая">Новая</option>
                                <option value="идет обучение">Идет обучение</option>
                                <option value="обучение завершено">Обучение завершено</option>
                            </select>
                            {updatingId === el.id && <small>Обновление...</small>}
                        </p>

                        <span className={`status status-${el.status}`}>{el.status}</span>
                        <br />
                        <small>Создано: {new Date(el.created_at).toLocaleDateString('ru-RU')}</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Admin