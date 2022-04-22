import { AuthorizationError ,InternalServerError } from '../utils/errors.js'
import JWT from 'jsonwebtoken'
import sha256 from 'sha256'
import path from 'path'
process.API = 'https://super-imtihon.herokuapp.com/'
let API = process.API
const REGISTER = (req,res,next)=>{
    try {
        let users = req.readFile('users')
        const {username,password} = req.body
        const {file} = req.files
        const user = users.find(el => el.username == username)
        if(user){
            return next(new AuthorizationError(400,"The user already exists"))
        }
        const profileImg = Date.now() + file.name.replace(/\s/g,'')
        const newFile ={
            userId: users.length ? users.at(-1).userId + 1 : 1,
            username,
            password : sha256(password),
            profileImg:API + profileImg
        }

        users.push(newFile)
        req.writeFile('users',users)
        file.mv(path.join(process.cwd(),'src','uploads',profileImg))

        delete newFile.password
        return res.status(200).json({
            status:200,
            massage:"The user successfully registered!",
            token: JWT.sign({userId: newFile.userId},'12345'),
            data:newFile
        })

    } catch (error) {
        return next(new InternalServerError(500,error.massage))
    }
}

const LOGIN = (req,res,next)=>{
    try {
        let { username, password } = req.body 

        let users = req.readFile('users')
        const user = users.find(el => el.username == username && el.password == sha256(password))
        if(!user){
            return next(new AuthorizationError(400, "Wrong username or password!"))
        }

        delete user.password 
        return res.status(200).json({
            status:200,
            massage:"The user successfully logged in!",
            token: JWT.sign({userId: user.userId},'12345'),
            data:user
        })
    } catch (error) {
        return next(new InternalServerError(500, error.massage))
    }
}
const GET = (req,res,next)=>{
    try {
        let users = req.readFile('users')
        return res.send(users)
    } catch (error) {
        return next(new InternalServerError(500, error.massage))
    }
}

export default {
    REGISTER,
    LOGIN,
    GET
}