import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './NewApplication.css'
import { AddApplicationFetch } from "../../../fetch/AddApplicationFetch"

function NewApplication() {
    const [course_name, setCourse_name] = useState("")
    const [desired_start_date, setDesired_start_date] = useState("")
    const [payment_method, setPayment_method] = useState("наличные")
    
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleCourse_name = (e) => { setCourse_name(e.target.value) }
    const handleDesired_start_date = (e) => { setDesired_start_date(e.target.value) }
    const handlePayment_method = (e) => { setPayment_method(e.target.value) }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!course_name || !desired_start_date || !payment_method) {
            return setErr("Все поля должны быть заполнены")
        }

        const selectedDate = new Date(desired_start_date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (selectedDate < today) {
            return setErr("Дата начала не может быть в прошлом")
        }

        const storedUser = localStorage.getItem("user")
        
        if (!storedUser) {
            return setErr("Пользователь не авторизован")
        }

        let user;
        try {
            user = JSON.parse(storedUser)
        } catch (e) {
            return setErr("Ошибка чтения данных пользователя")
        }

        if (!user || !user.id) {
            return setErr("Неверные данные пользователя")
        }

        setIsLoading(true);
        setErr("");

        const user_id = user.id;

        const applicationData = {
            user_id: user_id,
            course_name: course_name,
            desired_start_date: desired_start_date,
            payment_method: payment_method
        };

        try {
            const result = await AddApplicationFetch(applicationData);
            
            if (result.success === false) {
                throw new Error(result.message || "Ошибка при создании заявки")
            }
            
            console.log("Успех:", result);
            
            setCourse_name("");
            setDesired_start_date("");
            setPayment_method("наличные");
            
            navigate("/applications");
            
        } catch (error) {
            setErr(error.message || "Ошибка при создании заявки");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="formFull">
            <h2>Новая заявка на обучение</h2>
            <form action="" onSubmit={handleSubmit}>
                {err && <span className="error-message">{err}</span>}
                
                <div className="inputFull">
                    <label htmlFor="course_name">Название курса</label>
                    <input 
                        type="text" 
                        id="course_name"
                        value={course_name} 
                        onChange={handleCourse_name} 
                        placeholder="Например: Веб-разработка на Node.js"
                    />
                </div>

                <div className="inputFull">
                    <label htmlFor="desired_start_date">Желаемая дата начала</label>
                    <input 
                        type="date" 
                        id="desired_start_date"
                        value={desired_start_date} 
                        onChange={handleDesired_start_date} 
                    />
                </div>

                <div className="inputFull">
                    <label htmlFor="payment_method">Способ оплаты</label>
                    <select 
                        id="payment_method"
                        value={payment_method} 
                        onChange={handlePayment_method}
                    >
                        <option value="наличные">Наличные</option>
                        <option value="перевод по телефону">Перевод по телефону</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Отправка..." : "Подать заявку"}
                </button>

            </form>
            <Link to="/applications">Вернуться к списку заявок</Link>
        </div>
    )
}

export default NewApplication