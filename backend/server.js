import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import { RegUser } from './controllers/RegUser.js'
import { AutUser } from './controllers/AutUser.js'
import { GetApplications } from './controllers/GetApplications.js'
import { AddApplication } from './controllers/AddApplication.js'
import { GetAllApplications } from './controllers/GetAllApplications.js'
import { UpdateApplicationStatus } from './controllers/UpdateApplicationStatus.js'

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))

app.post('/reg', RegUser)
app.post('/aut', AutUser)
app.post('/applications', GetApplications)
app.post('/addApplication', AddApplication)
app.get('/getAllApplications', GetAllApplications)
app.put('/updateApplicationStatus', UpdateApplicationStatus)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})