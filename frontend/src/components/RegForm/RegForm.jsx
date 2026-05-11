import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './RegForm.css'
import { RegFetch } from "../../../fetch/RegFetch"

function RegForm() {
    const [surname, setSurname] = useState("")
    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSurname = (e) => { setSurname(e.target.value) }
    const handleName = (e) => { setName(e.target.value) }
    const handleSecondName = (e) => { setSecondName(e.target.value) }
    const handlePhone = (e) => { setPhone(e.target.value) }
    const handleEmail = (e) => { setEmail(e.target.value) }
    const handleLogin = (e) => { setLogin(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

    const valid = async (e) => {
        e.preventDefault()

        if (!surname || !name || !secondName || !phone || !email || !login || !password) {
            return setErr("Все поля должны быть заполнены")
        }
        const cyrillicRegex = /^[а-яА-ЯёЁ\s\-]+$/;
        const isSurnameValid = cyrillicRegex.test(surname);
        const isNameValid = cyrillicRegex.test(name);
        const isSecondNameValid = cyrillicRegex.test(secondName);

        if (!isSurnameValid || !isNameValid || !isSecondNameValid) {
            return setErr("ФИО должно быть написано на кириллице");
        }
        if (login.length < 6) {
            return setErr("Логин должен содержать минимум 6 символов")
        }
        if (password.length < 8) {
            return setErr("Пароль должен содержать минимум 8 символов")
        }
        const hasLatin = /[a-zA-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        if (!hasLatin || !hasDigit) {
            return setErr("Пароль должен содержать латинские буквы и цифры")
        }

        setIsLoading(true);

        const fullNameString = `${surname} ${name} ${secondName}`;

        const userData = {
            login: login,
            password: password,
            full_name: fullNameString,
            phone: phone,
            email: email
        };

        const result = await RegFetch(userData);
        console.log("Успех:", result);
        setIsLoading(false);

    }

    return (
        <div className="formFull">
            <h2>Регистрация</h2>
            <form action="" onSubmit={valid}>
                {err && <span>{err}</span>}
                <div className="inputFull">
                    <label htmlFor="">Фамилия</label>
                    <input type="text" value={surname} onChange={handleSurname} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Имя</label>
                    <input type="text" value={name} onChange={handleName} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Отчество</label>
                    <input type="text" value={secondName} onChange={handleSecondName} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Телефон</label>
                    <input type="text" value={phone} onChange={handlePhone} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Почта</label>
                    <input type="email" value={email} onChange={handleEmail} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Логин</label>
                    <input type="text" value={login} onChange={handleLogin} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Пароль</label>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>

                <button type="submit">Зарегистрироваться</button>

            </form>
            <Link to="/aut">Перейти к авторизации</Link>
        </div>
    )
}

export default RegForm