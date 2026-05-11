import { connection } from "../connectDB.js";
export function AutUser(req, res) {

    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    const sql = `select * from users where login = ? and password = ?`;

    const values = [login, password];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Ошибка сервера базы данных" });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: "Неверный логин или пароль" });
        }

        const user = results[0];
        res.status(200).json({
            message: "Авторизация успешна",
            user: {
                id: user.id,
                login: user.login,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
}