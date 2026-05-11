import { connection } from "../connectDB.js";

export function GetApplications(req, res) {

    const {user_id} = req.body

    const sql = `select * from applications where user_id = ?`

    const values = [ user_id ]

    connection.query(sql, values,(err, results)=>{
        if(err){
            console.error(err)
            return res.status(500)
        }
        if(results.length === 0){
            console.error(err)
            return res.status(200).json([])
        }

        return res.json(results)
    })

}