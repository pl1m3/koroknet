import { connection } from "../connectDB.js";

export function GetAllApplications(req, res){

    const sql = `select 
            applications.*,
            users.full_name,
            users.login
        from applications
        left join users on applications.user_id = users.id
        order by applications.created_at DESC`

    connection.query(sql, (err, results)=>{
        if(err){
            console.log(err)
            return res.status(500)
        }
        return res.json(results)
    })
}