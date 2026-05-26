import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { AutFetch } from "../../../fetch/AutFetch"
import './AutForm.css'

function AutForm() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e) => { setLogin(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

    const navigate = useNavigate()

    const valid = async (e) => {
        e.preventDefault()
        setErr("")

        if (!login || !password) {
            return setErr("Все поля должны быть заполнены")
        }

        setIsLoading(true)


        const result = await AutFetch({ login, password });

        localStorage.setItem('user', JSON.stringify(result.user));

        if (result.user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/applications');
        }
        setIsLoading(false);
    }

    return (
        <div className="formFull">
            <h2>Авторизация</h2>
            <form action="" onSubmit={valid}>
                {err && <span className="err">{err}</span>}
                <div className="inputFull">
                    <label htmlFor="">Логин</label>
                    <input type="text" value={login} onChange={handleLogin} />
                </div>

                <div className="inputFull">
                    <label htmlFor="">Пароль</label>
                    <input type="password" value={password} onChange={handlePassword} />
                </div>

                <button type="submit">Вход</button>
                <Link to="/reg">Перейти к регистрации</Link>
            </form>
        </div>
    )
}

export default AutForm