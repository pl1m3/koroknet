import { connection } from "../connectDB.js";
export function RegUser(req, res) {
    
    const { login, password, full_name, phone, email } = req.body;

    if (!login || !password || !full_name || !phone || !email) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    const sql = `INSERT INTO users (login, password, full_name, phone, email) VALUES (?, ?, ?, ?, ?)`;

    const values = [login, password, full_name, phone, email];

    connection.query(sql, values, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Пользователь с таким логином или email уже существует" });
            }
            console.error(err);
            return res.status(500).json({ message: "Ошибка сервера базы данных" });
        }
        
        res.status(201).json({ 
            message: "Пользователь успешно зарегистрирован",
            userId: results.insertId 
        });
    });
}