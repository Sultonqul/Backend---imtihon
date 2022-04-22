import express from "express"
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import '../config.js'
import userRouter from './routers/user.js'
import fileRouter from './routers/file.js'
import modelMiddleware from './middleware/module.js'
// import tokenMiddleware from './middleware/checkToken.js'
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(modelMiddleware({databasePath: path.join(process.cwd(),'src','database')}))
app.use(express.static(path.join(process.cwd(),'src','uploads')))

// app.use(/^(?!.*(login|register)).*$/, tokenMiddleware)

app.use(express.json())
app.use(fileUpload())
app.use(userRouter)
app.use(fileRouter)

app.use((error,req,res,next)=> {
    if(error.status != 500){
        return res.status(error.status).json({
            status:error.status,
            massage:error.massage,
            data: null,
            token: null
        })
    } 
})  

app.listen(PORT,()=>{console.log(`server is run http://localhost:${PORT}`)})