import { connection } from "../connectDB.js";

export function GetAllApplications(req, res){

    const sql = `select * from applications`

    connection.query(sql, (err, results)=>{
        if(err){
            console.log(err)
            return res.status(500)
        }
        return res.json(results)
    })
}