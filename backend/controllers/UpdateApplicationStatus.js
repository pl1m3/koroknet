import { connection } from "../connectDB.js";

export function UpdateApplicationStatus(req, res) {

    const { application_id, status } = req.body;

    const validStatuses = ['новая', 'идет обучение', 'обучение завершено'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
            success: false, 
            message: "Недопустимое значение статуса" 
        });
    }

    const sql = `update applications set status = ? where id = ?`;
    const values = [status, application_id];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error("Ошибка БД:", err);
            return res.status(500).json({ 
                success: false, 
                message: "Ошибка при обновлении статуса" 
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Заявка не найдена" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Статус обновлён",
            application_id,
            newStatus: status
        });
    });
}