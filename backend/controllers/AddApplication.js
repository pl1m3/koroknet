import { connection } from "../connectDB.js";

export function AddApplication(req, res){

    const {user_id, course_name, desired_start_date, payment_method} = req.body

    const sql = `insert into applications (user_id, course_name, desired_start_date, payment_method) values (?,?,?,?)`

    const value = [user_id, course_name, desired_start_date, payment_method]

    connection.query(sql, value,(err, results)=>{

        if(err){
            console.log(err)

            return res.status(500).json({ 
                success: false, 
                message: "Ошибка сервера при создании заявки" 
            });
        }
        return res.json(results)
    })
}